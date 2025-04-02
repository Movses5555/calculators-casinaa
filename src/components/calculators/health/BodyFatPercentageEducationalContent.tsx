
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleUser, ActivitySquare, Heart, Ruler, Weight, AlertCircle } from 'lucide-react';

const BodyFatPercentageEducationalContent: React.FC = () => {
  return (
    <div className="mt-10 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Understanding Body Fat Percentage</h2>
        <p className="text-lg mb-4">
          Body fat percentage is the amount of fat tissue in your body compared to lean tissue and other non-fat components. Understanding body fat percentage can help you set realistic fitness goals and monitor your health more accurately than just tracking weight.
        </p>
      </div>
      
      <Tabs defaultValue="what-is">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="what-is">What is it?</TabsTrigger>
          <TabsTrigger value="methods">Measurement Methods</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="what-is" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CircleUser className="mr-2 h-5 w-5 text-blue-500" />
                    What is Body Fat Percentage?
                  </h3>
                  <p className="mb-4">
                    Body fat percentage represents the proportion of fat tissue in your body compared to everything else (muscles, bones, organs, water, etc.). Unlike weight or BMI, body fat percentage directly measures the composition of your body, making it a much more useful metric for health and fitness goals.
                  </p>
                  <p className="mb-4">
                    Your body needs some fat to function properly. This essential fat is necessary for maintaining life and reproductive functions. The amount of essential fat differs between men and women, with women naturally having a higher percentage to support hormone-related functions.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Essential fat:</strong> 2-5% in men, 10-13% in women
                    </li>
                    <li>
                      <strong>Storage fat:</strong> The fat your body accumulates for energy reserves
                    </li>
                    <li>
                      <strong>Lean body mass:</strong> Everything else, including muscles, bones, organs, and water
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Why it matters</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ActivitySquare className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Better indicator of fitness than weight alone</span>
                      </li>
                      <li className="flex items-start">
                        <Heart className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Linked to health risks like diabetes and heart disease</span>
                      </li>
                      <li className="flex items-start">
                        <Weight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Helps track results from diet and exercise more accurately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="methods" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Body Fat Measurement Methods</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Navy Method</h4>
                  <p className="mb-2">
                    Uses body circumference measurements and height to estimate body fat percentage. It's easy to perform at home with just a measuring tape.
                  </p>
                  <ul className="list-disc pl-6">
                    <li>For men: measures neck and waist circumference</li>
                    <li>For women: measures neck, waist, and hip circumference</li>
                    <li>Pros: Easy, quick, and requires minimal equipment</li>
                    <li>Cons: Less accurate than other methods, especially for very athletic or obese individuals</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Skinfold Measurements</h4>
                  <p className="mb-2">
                    Uses calipers to measure skinfold thickness at specific body sites. The Jackson-Pollock 3-site and other multi-site methods fall into this category.
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Jackson-Pollock 3-site: Measures chest, abdomen, and thigh for men; triceps, suprailiac, and thigh for women</li>
                    <li>Pros: More accurate than circumference measurements</li>
                    <li>Cons: Requires proper technique and specialized equipment (calipers)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Other Professional Methods</h4>
                  <ul className="list-disc pl-6">
                    <li><strong>DEXA scan:</strong> Gold standard, uses X-ray technology to measure bone, fat, and muscle</li>
                    <li><strong>Hydrostatic weighing:</strong> Based on underwater weight and displacement</li>
                    <li><strong>Bioelectrical Impedance Analysis (BIA):</strong> Uses electrical current to measure resistance in body tissues</li>
                    <li><strong>Bod Pod:</strong> Air displacement plethysmography that measures body volume</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Body Fat Percentage Categories</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mb-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Men</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Women</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Essential Fat</td>
                      <td className="px-6 py-4 whitespace-nowrap">2-5%</td>
                      <td className="px-6 py-4 whitespace-nowrap">10-13%</td>
                      <td className="px-6 py-4">Minimum needed for basic physiological functions</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Athletes</td>
                      <td className="px-6 py-4 whitespace-nowrap">6-13%</td>
                      <td className="px-6 py-4 whitespace-nowrap">14-20%</td>
                      <td className="px-6 py-4">Typically seen in elite athletes</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Fitness</td>
                      <td className="px-6 py-4 whitespace-nowrap">14-17%</td>
                      <td className="px-6 py-4 whitespace-nowrap">21-24%</td>
                      <td className="px-6 py-4">Lean and defined muscular appearance</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Average</td>
                      <td className="px-6 py-4 whitespace-nowrap">18-24%</td>
                      <td className="px-6 py-4 whitespace-nowrap">25-31%</td>
                      <td className="px-6 py-4">Typical for most adults</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Obese</td>
                      <td className="px-6 py-4 whitespace-nowrap">25%+</td>
                      <td className="px-6 py-4 whitespace-nowrap">32%+</td>
                      <td className="px-6 py-4">Increased health risks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
                    <p className="text-sm text-yellow-700">
                      These categories are general guidelines and may not be appropriate for everyone. Body fat percentage goals should be personalized based on individual factors like age, fitness level, and health status. Extremely low body fat percentages can be dangerous and should only be pursued under professional supervision.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">What is a healthy body fat percentage?</h4>
                  <p>
                    A healthy body fat percentage varies by gender, age, and fitness goals. Generally, 10-20% for men and 18-28% for women is considered healthy for adults. Athletes typically have lower percentages, while older adults may naturally have slightly higher percentages.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">How accurate are body fat calculators?</h4>
                  <p>
                    The accuracy varies by method. The Navy method has an error range of about ±3-4%, while skinfold methods have an error range of about ±3%. For comparison, DEXA scans (the gold standard) have an error range of about ±1-2%. Home methods are most useful for tracking changes over time rather than determining an exact percentage.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">How quickly can I reduce my body fat percentage?</h4>
                  <p>
                    A safe and sustainable rate of fat loss is about 0.5-1% of body weight per week, which might translate to roughly 0.5% body fat percentage reduction per month. Faster rates of loss may lead to muscle loss and are harder to maintain. Focus on consistent habits rather than rapid results.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Can I have a low body fat percentage but still not have visible abs?</h4>
                  <p>
                    Yes. Visible abs require both low body fat (typically below 15% for men and 22% for women) and developed abdominal muscles. Genetics also play a role in fat distribution and muscle definition. Some people may need to reach lower body fat percentages to see definition than others.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Is it dangerous to have very low body fat?</h4>
                  <p>
                    Yes, extremely low body fat percentages (below essential fat levels) can lead to hormonal disturbances, immune system suppression, increased injury risk, and other health problems. For most people, maintaining extremely low body fat is neither healthy nor sustainable long-term.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Tips for Improving Body Composition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Diet Strategies</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Prioritize protein intake (0.7-1g per pound of body weight)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Create a moderate calorie deficit (10-20% below maintenance)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Include plenty of fiber-rich vegetables and fruits</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Stay hydrated (water can help with satiety)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Limit processed foods and added sugars</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Exercise Recommendations</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Include resistance training 2-4 times per week</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Incorporate both high-intensity and moderate cardio</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Don't neglect recovery and sleep</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Focus on progressive overload to build muscle</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Consider periodizing your training throughout the year</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>
          Note: This calculator provides estimates based on formulas and should not be used as a substitute for professional medical advice. For the most accurate assessment of your body composition, consult with healthcare professionals who can perform more precise measurements.
        </p>
      </div>
    </div>
  );
};

export default BodyFatPercentageEducationalContent;
