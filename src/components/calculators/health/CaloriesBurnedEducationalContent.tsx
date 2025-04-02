
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Heart, Watch, Calendar, Lightbulb } from 'lucide-react';

const CaloriesBurnedEducationalContent: React.FC = () => {
  return (
    <section className="mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Understanding Calories Burned</h2>
      
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="met">MET Values</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">How Calories Are Burned</h3>
              <p className="mb-4">
                Your body burns calories during physical activity, but also when at rest to maintain basic functions like breathing and circulation. This is known as your Basal Metabolic Rate (BMR).
              </p>
              <p className="mb-4">
                During exercise, your body increases energy expenditure above your BMR, which is where this calculator comes in. The more intense the activity and the longer you perform it, the more calories you'll burn.
              </p>
              <p>
                Your weight also plays a significant role - heavier individuals typically burn more calories doing the same activity as lighter individuals because it requires more energy to move more mass.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">The Calorie Burning Formula</h3>
              <p className="mb-4">
                This calculator uses the following formula to determine calories burned:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-center font-mono my-4">
                Calories Burned = MET × Weight (kg) × Duration (hours)
              </div>
              <p>
                Where MET (Metabolic Equivalent of Task) is a measure of the energy cost of physical activities as a multiple of resting metabolic rate.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="met" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Understanding MET Values</h3>
              <p className="mb-4">
                MET (Metabolic Equivalent of Task) is a unit that represents the energy cost of physical activities. One MET is defined as the energy spent while sitting quietly, which is approximately 1 calorie per kilogram of body weight per hour.
              </p>
              <p className="mb-2">
                Activities are assigned MET values based on their intensity:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Light activities (1-3 METs):</strong> Sitting, standing, walking slowly</li>
                <li><strong>Moderate activities (3-6 METs):</strong> Brisk walking, light cycling, gardening</li>
                <li><strong>Vigorous activities (6+ METs):</strong> Running, swimming laps, heavy weightlifting</li>
              </ul>
              <p>
                The higher the MET value, the more calories you burn in the same amount of time compared to resting.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Sample MET Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Daily Activities</p>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>Sitting quietly: 1.0 MET</li>
                    <li>Standing: 1.5 METs</li>
                    <li>Cooking: 2.5 METs</li>
                    <li>Cleaning: 3.0 METs</li>
                    <li>Gardening: 3.8 METs</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Walking & Running</p>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>Walking (2.5 mph): 3.0 METs</li>
                    <li>Walking (3.5 mph): 4.3 METs</li>
                    <li>Jogging: 7.0 METs</li>
                    <li>Running (6 mph): 9.8 METs</li>
                    <li>Running (10 mph): 14.5 METs</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Sports</p>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>Golf: 4.8 METs</li>
                    <li>Tennis: 7.0 METs</li>
                    <li>Basketball: 8.0 METs</li>
                    <li>Soccer: 7.0 METs</li>
                    <li>Swimming laps: 8.0 METs</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Gym Activities</p>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>Light weightlifting: 3.5 METs</li>
                    <li>Moderate weightlifting: 5.0 METs</li>
                    <li>Cycling (stationary): 7.0 METs</li>
                    <li>Aerobics: 7.0 METs</li>
                    <li>CrossFit: 8.0 METs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Maximizing Your Calorie Burn</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Incorporate High-Intensity Interval Training (HIIT)</h4>
                    <p className="text-gray-600">
                      HIIT involves short bursts of intense exercise alternated with low-intensity recovery periods. This approach can increase calorie burn and improve metabolic rate for hours after exercise.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Add Strength Training</h4>
                    <p className="text-gray-600">
                      Building muscle increases your resting metabolic rate. More muscle mass means more calories burned even when not exercising.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Stay Consistent</h4>
                    <p className="text-gray-600">
                      Regular, consistent exercise is more effective for calorie burning and fitness improvement than occasional intense workouts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mix Up Your Routine</h4>
                    <p className="text-gray-600">
                      Your body adapts to exercise over time, becoming more efficient and burning fewer calories. Regularly changing your workout routine challenges your body in new ways.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Non-Exercise Activity Thermogenesis (NEAT)</h3>
              <p className="mb-4">
                NEAT refers to the calories burned during non-exercise activities like standing, walking, fidgeting, and even typing. Increasing your daily movement through NEAT can significantly impact your total calorie expenditure.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Ways to increase NEAT:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use a standing desk</li>
                  <li>Take the stairs instead of elevators</li>
                  <li>Park further away from entrances</li>
                  <li>Take short walking breaks during work</li>
                  <li>Do household chores more vigorously</li>
                  <li>Walk or bike for short trips instead of driving</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg">How accurate is this calculator?</h4>
                  <p className="text-gray-600 mt-1">
                    This calculator provides a reasonable estimate based on MET values from research. However, individual factors like fitness level, body composition, and efficiency of movement can affect actual calorie burn. For the most accurate measurement, consider using a heart rate monitor or other wearable fitness device.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Why do I burn fewer calories than someone else doing the same activity?</h4>
                  <p className="text-gray-600 mt-1">
                    Calorie burn is primarily influenced by weight - heavier individuals burn more calories during the same activity. Additionally, factors like age, gender, fitness level, and body composition affect metabolic rate and efficiency of movement.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">How many calories should I burn to lose weight?</h4>
                  <p className="text-gray-600 mt-1">
                    Weight loss occurs when you create a calorie deficit by burning more calories than you consume. Generally, a deficit of 3,500 calories is needed to lose one pound of fat. This can be achieved through a combination of reduced calorie intake and increased physical activity. Aim for a sustainable deficit of 500-1000 calories per day for healthy weight loss of 1-2 pounds per week.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Does building muscle help burn more calories?</h4>
                  <p className="text-gray-600 mt-1">
                    Yes, muscle tissue burns more calories at rest than fat tissue. By increasing your lean muscle mass through strength training, you can increase your resting metabolic rate, helping you burn more calories throughout the day even when not exercising.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">How often should I exercise to maintain a healthy weight?</h4>
                  <p className="text-gray-600 mt-1">
                    The CDC recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities on 2 or more days per week. For weight loss or maintaining weight loss, you may need up to 300 minutes of moderate-intensity activity per week.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-blue-50 p-5 rounded-lg">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-blue-800">Important Note</h3>
            <p className="text-blue-700 mt-1">
              This calculator provides estimates based on average values and should be used as a general guide only. Individual results may vary based on factors such as age, gender, body composition, fitness level, and exercise intensity. Always consult with healthcare professionals before starting any new exercise program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaloriesBurnedEducationalContent;
