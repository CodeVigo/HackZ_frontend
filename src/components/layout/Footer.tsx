import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                NextGen
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Transforming campus recruitment with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Support'].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 mr-2" />
                contact@nextgen.com
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                123 Tech Street, CA 94043
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                <Link
                  key={social}
                  to="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {currentYear} NextGen Recruitment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}