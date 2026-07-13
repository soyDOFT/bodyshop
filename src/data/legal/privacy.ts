export type LegalSection = {
  heading: string;
  body: string[];
};

export const PRIVACY_INTRO = [
  'Our business including our affiliates (collectively "we," "our," "us," and "the Company") takes your privacy seriously. This Policy describes how we collect, use, share, and protect information obtained from customers, users, and visitors to our website. By using our website, you have agreed and are additionally subject to any additional Terms of Service which incorporate this Policy by reference.',
  'This Policy describes:',
  '• How we collect information, and how you may provide it, through our website, including the domain, any mobile applications, call-tracking lines, and the customer/user dashboard or portal (collectively, the "Sites").',
  '• How we use and protect information.',
  '• With whom we may share information.',
  '• The types of information we collect.',
  'By visiting the Sites, linked pages, features, content, or using any of our services, you acknowledge and accept the practices and policies outlined in this Policy. If you do not agree to this Policy, you may not access or otherwise use the Sites.',
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: '1. What information do we collect?',
    body: [
      'Information you provide: We collect information you enter on our Site when you create an account, register, engage in a transaction, search our products, contact us by telephone or through our call-tracking telephone line, email, or otherwise participate in any other promotions, surveys, or questionnaires we sponsor. We may collect personally identifiable information ("PII") from the Sites only when you choose to provide it. The information collected may include contact information, payment information, shipping information, and purchase history.',
      'Mobile web and apps: We may collect certain additional information when you access the Sites with mobile devices, including location, device type, unique device identifiers, mobile operating system, site navigation, and other app-specific user data. You may restrict the collection of certain data by changing settings on your mobile device.',
      'Interest-based advertising: When you interact with the Sites, advertisements, or other content provided by the Company or third parties on our behalf, we and third parties automatically collect non-personally identifiable information ("Non-PII") about or from your device, including cookie information, pixel tags, and unique device identifiers. We may use this information and tie it back to information you provide us to customize your interaction with our business.',
    ],
  },
  {
    heading: '2. Cookies',
    body: [
      'A cookie is a text file that websites send to a visitor\'s computer or other internet-connected device to uniquely identify the visitor\'s browser or to store information or settings in the browser. By using the Sites you accept the use of cookies described in this Policy. You can disable or delete cookies by changing the preferences on your device browser. Disabling cookies may prevent you from using some of the features on the Sites.',
      'We use third-party tracking services that may use cookies to provide non-personally identifiable information and services on our Sites. Our Third-Party Service Providers may use pixel tags or web beacons to control the automated collection of Non-PII.',
    ],
  },
  {
    heading: '3. What we do with collected information',
    body: [
      'We may use the information you provide and information we collect about you for various reasons, including to improve your user experience across the Sites, assist with marketing and advertising efforts, create/administer/communicate regarding your account, notify you regarding any updates or changes, and to comply with applicable laws.',
      'We may employ Third-Party Service Providers to help, on our behalf, in providing analytics, advertisements, links, or other tools and services. These Third-Party Service Providers may collect Non-PII through use of cookies, pixel tags, or other automated means.',
    ],
  },
  {
    heading: '4. Sharing of information',
    body: [
      'We may share information we collect with our Third-Party Service Providers that we engage to help us administer and provide our service and to perform tasks on our behalf. We may also use your PII to contact and correspond with you and/or respond to your inquiries. Additionally, we may disclose information about you if we are required to do so by law or legal process.',
    ],
  },
  {
    heading: "5. Children's privacy rights",
    body: [
      'We do not knowingly collect information from anyone under the age of thirteen (13). Our Sites are not intended for or directed at children under the age of thirteen. Any user under the age of eighteen (18) must be accompanied by an adult when accessing the Sites.',
    ],
  },
  {
    heading: '6. Security',
    body: [
      'We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.',
    ],
  },
  {
    heading: '7. Links to other sites',
    body: [
      'Our Sites may contain embedded links that enable you to visit other sites of interest. Once you have used these links to leave our site, you should note that we do not have any control over the other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide while visiting such sites.',
    ],
  },
  {
    heading: '8. What choices do users have?',
    body: [
      'You can choose not to disclose information to us; however, some of this information may be necessary to take advantage of our services or features of the Sites. You can opt out of promotions and other communications from the Company by changing preferences or emailing us. You can also opt out of the collection of certain information collected by mobile applications by changing settings on your mobile device.',
    ],
  },
  {
    heading: '9. Changes in policy',
    body: [
      'The information we collect through or on our Sites is covered by the privacy policy in effect at the time the information is collected. We may amend or revise this Policy from time to time. Any revised or amended policies will be posted on our Sites and will reflect the date it was last updated.',
    ],
  },
  {
    heading: '10. Our site is maintained in the U.S.A.',
    body: [
      'By using this Site, you authorize the export of your information to the U.S.A. and its storage and use as specified by this Policy.',
    ],
  },
];
