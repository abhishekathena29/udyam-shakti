import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, CheckCircle2 } from 'lucide-react';

// Hardcoded short descriptions and content for each lesson
const lessonDetails: Record<string, { shortDescription: string; content: string }> = {
  'lesson-1': {
    shortDescription: 'Master the art of product display and arrangement to maximize customer attraction.',
    content: `Setting up your stall effectively is crucial for attracting customers. Here are key strategies:

• **Front Display**: Place your best and most colorful products at the front to catch attention
• **Height Variation**: Use boxes or stands to create different height levels for visual interest
• **Group Similar Items**: Organize products by type or price to make shopping easier
• **Keep It Clean**: Regularly arrange and clean your display to maintain a professional look
• **Lighting**: Ensure your stall is well-lit, especially in the morning and evening
• **Accessibility**: Make sure customers can easily see and reach all products

A well-organized stall not only looks professional but also helps customers find what they need quickly, leading to more sales.`
  },
  'lesson-2': {
    shortDescription: 'Create welcoming first impressions that turn visitors into loyal customers.',
    content: `First impressions matter greatly in business. Here's how to greet customers effectively:

• **Warm Smile**: Always greet customers with a genuine smile and eye contact
• **Friendly Greeting**: Use phrases like "Namaste" or "Welcome" in a cheerful tone
• **Be Approachable**: Stand in a way that shows you're ready to help, not blocking your products
• **Ask Open Questions**: Instead of "Do you need something?", try "What are you looking for today?"
• **Show Interest**: Listen actively to what customers are saying
• **Respect Personal Space**: Don't be too pushy; let customers browse comfortably

Remember, a friendly greeting can make customers feel valued and more likely to make a purchase.`
  },
  'lesson-3': {
    shortDescription: 'Learn pricing techniques that balance customer appeal with healthy profit margins.',
    content: `Smart pricing is essential for business success. Consider these strategies:

• **Know Your Costs**: Calculate all expenses including purchase price, transport, and your time
• **Competitive Pricing**: Check what others are charging, but don't undercut yourself
• **Psychological Pricing**: Use prices like ₹49 or ₹99 instead of ₹50 or ₹100
• **Bundle Deals**: Offer discounts when customers buy multiple items
• **Seasonal Adjustments**: Adjust prices based on demand and season
• **Value Communication**: Explain why your products are worth the price

The goal is to price competitively while ensuring you make a fair profit. Don't be afraid to charge what your products are worth.`
  },
  'lesson-4': {
    shortDescription: 'Embrace digital payments to expand your customer base and increase sales.',
    content: `Digital payments are becoming essential for modern businesses. Here's how to get started:

• **Choose a UPI App**: Popular options include PhonePe, Google Pay, Paytm, or BHIM
• **Display QR Code**: Print and prominently display your UPI QR code at your stall
• **Multiple Options**: Offer both UPI and cash to accommodate all customers
• **Quick Setup**: Most UPI apps are free and easy to set up
• **Track Transactions**: Digital payments help you track sales automatically
• **Promote Benefits**: Tell customers about the convenience of digital payments

Digital payments reduce the need for change, prevent theft, and make transactions faster. Many customers prefer paying digitally, so offering this option can increase your sales.`
  },
  'lesson-5': {
    shortDescription: 'Transform satisfied customers into your most effective marketing channel.',
    content: `Word of mouth is one of the most powerful marketing tools. Here's how to leverage it:

• **Exceed Expectations**: Always deliver more than promised
• **Personal Touch**: Remember regular customers' names and preferences
• **Ask for Referrals**: Politely ask happy customers to tell their friends
• **Handle Complaints Well**: Turn negative experiences into positive ones
• **Consistent Quality**: Maintain high standards so customers always have good things to say
• **Create Shareable Moments**: Make your stall memorable with friendly service

Happy customers are your best advertisement. One satisfied customer can bring you many more through recommendations.`
  },
  'lesson-6': {
    shortDescription: 'Track expenses accurately to understand your true profit and make better decisions.',
    content: `Understanding your expenses is key to knowing your real profit. Track these costs:

• **Purchase Costs**: What you pay to buy products
• **Transportation**: Cost of getting products to your stall
• **Stall Rent**: Daily or monthly rent for your space
• **Packaging**: Bags, boxes, and wrapping materials
• **Utilities**: Electricity, water, or other services
• **Personal Expenses**: Food, drinks during work hours

**Profit Calculation**: Total Sales - Total Expenses = Real Profit

Keep a simple notebook or use an app to track expenses daily. This helps you:
- Know if you're actually making money
- Identify where you can cut costs
- Make informed pricing decisions
- Plan for the future

Remember: High sales don't always mean high profit if expenses are too high.`
  },
  'lesson-7': {
    shortDescription: 'Adapt your business strategy to capitalize on festivals and seasonal opportunities.',
    content: `Seasonal changes and festivals offer great opportunities. Here's how to adapt:

• **Festival Planning**: Stock up on items related to upcoming festivals (diyas for Diwali, flowers for festivals)
• **Weather Awareness**: Adjust products based on weather (umbrellas in monsoon, cool drinks in summer)
• **Seasonal Products**: Focus on seasonal fruits and vegetables
• **Special Offers**: Create festival-specific bundles or discounts
• **Decorate Your Stall**: Add festive decorations to attract attention
• **Plan Ahead**: Order supplies in advance before peak seasons

**Festival Tips**:
- Research what's popular during each festival
- Stock up early to avoid last-minute shortages
- Create special packages or gift sets
- Extend hours during busy festival periods

Adapting to seasons and festivals can significantly boost your sales.`
  },
  'lesson-8': {
    shortDescription: 'Build lasting relationships that keep customers returning to your business.',
    content: `Customer loyalty is the foundation of a successful business. Build it with these strategies:

• **Consistent Quality**: Always maintain the same high quality customers expect
• **Remember Customers**: Greet regular customers by name and remember their preferences
• **Loyalty Rewards**: Offer small discounts or free items to frequent customers
• **Reliability**: Be consistent in your location, hours, and product availability
• **Go the Extra Mile**: Small gestures like helping carry bags or offering advice
• **Handle Issues Gracefully**: If something goes wrong, fix it immediately and apologize

**Benefits of Loyal Customers**:
- They buy more frequently
- They recommend you to others
- They're willing to pay fair prices
- They're more forgiving of occasional mistakes

Loyal customers are worth 10 times more than new ones because they keep coming back.`
  },
  'lesson-9': {
    shortDescription: 'Maintain optimal stock levels to meet demand without overstocking.',
    content: `Good inventory management prevents waste and ensures you never run out of popular items:

• **Track Sales**: Note which items sell fast and which are slow
• **Regular Counting**: Count your stock daily or weekly
• **Reorder Point**: Know when to order more (e.g., when you have 20% left)
• **Avoid Overstocking**: Don't buy more than you can sell, especially perishable items
• **First In, First Out**: Sell older stock before new stock (FIFO method)
• **Seasonal Adjustments**: Increase stock before busy seasons, reduce during slow periods

**Simple Tracking Method**:
- Keep a notebook with item names
- Mark sales and new purchases
- Calculate remaining stock
- Set minimum stock levels for each item

Good inventory management means you always have what customers want without wasting money on unsold items.`
  },
  'lesson-10': {
    shortDescription: 'Master negotiation skills to secure better deals while maintaining relationships.',
    content: `Negotiation is an important skill for both buying and selling. Here's how to do it well:

• **Know Your Limits**: Decide your minimum acceptable price before negotiating
• **Be Respectful**: Always maintain a friendly, respectful tone
• **Listen First**: Understand the other person's needs and constraints
• **Win-Win Approach**: Aim for solutions that benefit both parties
• **Be Flexible**: Sometimes offer something else (bulk purchase, future business) instead of just lower price
• **Know When to Walk Away**: Don't accept deals that hurt your business

**Buying Tips**:
- Build relationships with suppliers
- Offer to buy in bulk for better prices
- Pay on time to build trust

**Selling Tips**:
- Stand firm on your minimum price
- Explain the value/quality of your products
- Offer alternatives if customer wants lower price

Good negotiation builds trust and long-term relationships while protecting your interests.`
  },
  'lesson-11': {
    shortDescription: 'Use WhatsApp to showcase products, take orders, and build customer relationships.',
    content: `WhatsApp is a powerful free tool for small businesses. Here's how to use it effectively:

• **Business Profile**: Create a clear business profile with your name, description, and location
• **Product Catalog**: Use WhatsApp's catalog feature to showcase your products with photos and prices
• **Quick Responses**: Reply to customer messages promptly
• **Send Updates**: Share daily specials, new arrivals, or seasonal offers
• **Take Orders**: Accept orders through WhatsApp for pickup or delivery
• **Build Groups**: Create a customer group for announcements and special offers

**Best Practices**:
- Send messages during business hours
- Use clear, good-quality product photos
- Keep messages concise and friendly
- Don't spam; send valuable information
- Use voice messages for personal touch

WhatsApp helps you stay connected with customers even when they're not at your stall, leading to more sales.`
  },
  'lesson-12': {
    shortDescription: 'Leverage Facebook and Instagram to reach new customers and grow your business.',
    content: `Social media can help you reach customers beyond your physical location. Get started:

• **Choose Platforms**: Start with Facebook or Instagram (or both)
• **Create Business Pages**: Set up free business profiles, not personal accounts
• **Post Regularly**: Share photos of your products, daily specials, and behind-the-scenes content
• **Use Hashtags**: Use relevant local hashtags to reach nearby customers
• **Engage**: Reply to comments and messages promptly
• **Show Your Story**: Share your business journey, tips, and customer testimonials

**Content Ideas**:
- Daily product photos with prices
- Customer testimonials
- Business tips and updates
- Seasonal offers and promotions
- Behind-the-scenes of your stall setup

**Getting Started**:
- Ask a friend or family member to help set up if needed
- Start simple with just photos and basic information
- Post consistently (even 2-3 times per week helps)
- Share your social media handles with customers

Social media is free marketing that can bring customers to your stall.`
  },
  'lesson-13': {
    shortDescription: 'Calculate and optimize profit margins to ensure sustainable business growth.',
    content: `Understanding profit margins helps you make better business decisions. Here's how:

• **What is Profit Margin?**: The percentage of profit you make on each sale

• **Calculation**:
  - Cost Price: What you paid for the product
  - Selling Price: What you charge customers
  - Profit = Selling Price - Cost Price
  - Profit Margin % = (Profit ÷ Selling Price) × 100

**Example**:
- You buy tomatoes for ₹30/kg
- You sell for ₹50/kg
- Profit = ₹50 - ₹30 = ₹20
- Profit Margin = (₹20 ÷ ₹50) × 100 = 40%

**Healthy Margins**:
- Aim for at least 20-30% profit margin
- Higher margins on unique or premium products
- Lower margins on high-volume, fast-moving items

**Improving Margins**:
- Negotiate better purchase prices
- Reduce waste and spoilage
- Focus on higher-margin products
- Increase prices where market allows

Understanding margins helps you know which products are most profitable and where to focus your efforts.`
  },
  'lesson-14': {
    shortDescription: 'Maintain consistent product quality to build trust and ensure repeat business.',
    content: `Quality control is essential for building customer trust and repeat business:

• **Inspect Before Buying**: Check quality when purchasing from suppliers
• **Regular Checks**: Inspect your products daily for freshness and condition
• **Remove Bad Items**: Immediately remove damaged, spoiled, or low-quality items
• **Proper Storage**: Store products correctly to maintain quality (cool, dry, clean areas)
• **Handle with Care**: Be gentle when handling products to avoid damage
• **Set Standards**: Decide your quality standards and stick to them

**Benefits of Quality Control**:
- Customers trust you and come back
- Less waste from spoiled products
- You can charge fair prices
- Builds your reputation
- Reduces complaints and returns

**Quick Quality Checklist**:
- Are products fresh and in good condition?
- Is packaging clean and intact?
- Are products properly stored?
- Would you buy this quality yourself?

Remember: One bad experience can lose a customer forever. Consistent quality keeps customers coming back.`
  },
  'lesson-15': {
    shortDescription: 'Collect and use customer feedback to continuously improve your business.',
    content: `Customer feedback is valuable information that helps you improve. Here's how to use it:

• **Ask for Feedback**: Politely ask customers what they think about your products and service
• **Listen Actively**: Pay attention to what customers say, both positive and negative
• **Observe Behavior**: Notice which products customers look at but don't buy
• **Act on Feedback**: Make changes based on what customers tell you
• **Thank Customers**: Always thank customers for their feedback
• **Follow Up**: Check back with customers after making improvements

**Types of Feedback**:
- **Product Quality**: "Are the vegetables fresh enough?"
- **Pricing**: "Are prices reasonable?"
- **Service**: "Was I helpful and friendly?"
- **Selection**: "Do I have what customers want?"
- **Location**: "Is my stall easy to find?"

**Using Feedback**:
- Fix problems immediately
- Add products customers request
- Adjust prices if needed
- Improve your service approach
- Change display or organization

**Remember**: 
- Don't take negative feedback personally
- Use it as an opportunity to improve
- Most customers appreciate being asked
- Small improvements based on feedback can lead to big results

Customer feedback is free advice that helps you grow your business.`
  }
};

export default function Learn() {
  const { lessons } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Basics', value: 'basics' },
    { name: 'Sales', value: 'sales' },
    { name: 'Digital', value: 'digital' },
    { name: 'Marketing', value: 'marketing' },
    { name: 'Finance', value: 'finance' },
  ];

  const currentLesson = selectedLesson ? lessons.find(l => l.id === selectedLesson) : null;
  const lessonContent = selectedLesson ? lessonDetails[selectedLesson] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Learn</h1>
        <p className="text-muted-foreground mt-2">
          Expand your business knowledge with our curated lessons
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category.value} variant="outline" size="sm">
            {category.name}
          </Button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => {
          const details = lessonDetails[lesson.id];
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                      {lesson.thumbnailEmoji}
                    </div>
                    {lesson.completed && (
                      <Badge variant="default" className="bg-success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                  {details && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {details.shortDescription}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {lesson.duration} min
                      </span>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedLesson(lesson.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Lesson Content Dialog */}
      <Dialog open={selectedLesson !== null} onOpenChange={(open) => !open && setSelectedLesson(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {currentLesson?.thumbnailEmoji} {currentLesson?.title}
            </DialogTitle>
            <DialogDescription>{currentLesson?.description}</DialogDescription>
          </DialogHeader>
          {lessonContent && (
            <div className="mt-4 prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-foreground space-y-2">
                {lessonContent.content.split('\n').map((line, idx) => {
                  // Simple markdown bold rendering
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={idx} className="leading-relaxed">
                      {parts.map((part, partIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={partIdx}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

