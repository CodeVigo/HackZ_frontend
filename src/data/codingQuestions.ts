import { CodingQuestion } from '../types/test';

export const CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    testCases: ["Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]"]
  },
  {
    id: 2,
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    testCases: ["Input: x = 121\nOutput: true"]
  },
  {
    id: 3,
    title: "Reverse String",
    description: "Write a function that reverses a string.",
    testCases: ["Input: s = ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']"]
  },
  {
    id: 4,
    title: "FizzBuzz",
    description: "Write a program that outputs the string representation of numbers from 1 to n, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
    testCases: ["Input: n = 15\nOutput: ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']"]
  },
  {
    id: 5,
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    testCases: ["Input: s = '()'\nOutput: true"]
  }
];