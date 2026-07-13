export type Testimonial = {
  name: string;
  area: string;
  body: string;
  expandableAt?: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jazlyne H.',
    area: 'Fort Mill',
    body: "I went to Mr. Salazar about 6 months ago after I'd rear-ended someone and completely torn off my front bumper. After calling several shops in Charlotte and getting outrageously high quotes ($700+ even if I bought the part on my own), I called Mr. Salazar and he said he could fix it for $100 if I bought the part myself. At first I was a bit nervous when I brought him my car and waited while he fixed it, but he did a fantastic job and was extremely professional and kind. I'd go here before anywhere else again. Corporations in the area only care about your money and jacking up the prices for decent work, but Mr. Salazar fixed my bumper the same day in less than 90 minutes and it looked great. I wish I would've taken the extra money at the time to have him paint the bumper as well, but I was really just interested in getting a new bumper on my car. I wish I would've left a review sooner. Thanks so much.",
    expandableAt: 280,
  },
  {
    name: 'Emily P.',
    area: 'Matthews',
    body: 'Exclusive Body Shop fixed up my dented bumper and the repair ended up costing me $150 less than my next-lowest estimate. It looks as good as new.',
  },
  {
    name: 'Ben H.',
    area: 'Mint Hill',
    body: 'Picked up my 1999 F150 this week. It looks like it just rolled out of the dealership showroom. Mr. Walter did a fantastic job. There were lots of minor dents, dings and scratches and some that were not so minor. The truck looks brand new. I am very pleased with the quality work. Take your vehicle there and you will not be disappointed.',
    expandableAt: 280,
  },
  {
    name: 'Doug T.',
    area: 'Denver',
    body: 'Walter takes care of all my cars, especially when my kids were just learning to drive. You can bet Exclusive Body Shop is where I will go to when the next bump-up happens. He also does custom gas tanks for cycles, and they are works of art.',
  },
  {
    name: 'Kathleen H.',
    area: 'Charlotte',
    body: "Over a year ago, Walter replaced the driver-side door on my Hyundai Touring. With all the rain we are having, I am happy to report the door is still water-tight, air-tight, the electric window works perfectly and the hinges do not squeak. It was a lucky day when I found Exclusive Body Shop. Make your own good luck and give him a call. You'll be glad you did.",
    expandableAt: 280,
  },
  {
    name: 'Daisy V.',
    area: 'Charlotte',
    body: 'I would highly recommend Exclusive Body Shop. Walter has great customer service and is willing to work with whatever kind of schedule you may have. He recently worked on my Altima and it looks amazing. I am very satisfied with his work on my car. He is an honest businessman and is willing to give you a good price for his work. I had some black side-scuffs from another car on my white car and he cleaned it all off for an awesome deal compared to other places that will overcharge you for a simple cleanup, plus he fixed up some additional damages to my car. If you want car repairs from someone who is getting the job done right, come to Exclusive Body Shop. You will not be disappointed. The work you want will be guaranteed. Walter is truly a people person and his great work shows.',
    expandableAt: 280,
  },
];
