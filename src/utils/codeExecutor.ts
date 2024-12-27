export async function executeJavaScript(code: string): Promise<string> {
  try {
    // Create a safe evaluation context
    const safeEval = new Function('code', `
      try {
        const console = {
          log: (...args) => args.join(' '),
          error: (...args) => args.join(' '),
          warn: (...args) => args.join(' ')
        };
        let output = '';
        const originalLog = console.log;
        console.log = (...args) => {
          output += args.join(' ') + '\\n';
          originalLog.apply(console, args);
        };
        
        ${code}
        
        return output;
      } catch (error) {
        return 'Error: ' + error.message;
      }
    `);

    return await safeEval(code);
  } catch (error) {
    return `Error: ${error.message}`;
  }
}