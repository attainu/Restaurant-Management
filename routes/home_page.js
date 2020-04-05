const express = require('express');
const router = express.Router();


router.get('/',(req,res) => res.json({
    statusCode : 200,
    Restaurant : {
        Message : ' WELCOME TO THE VERY FAMOUS RESTAURANT '
    },
    About : {
        A_Beief_details : ` A restaurant (sometimes known as a diner) is a place where cooked food is sold to the public, and where people sit down to eat it. It is also a place where people go to enjoy the time and to eat a meal.
  
    Some restaurants are a chain, meaning that there are restaurants which have the same name and serve the same food. McDonald's, Burger King, and Pizza Hut are examples of chain restaurants that are all over the world. These restaurants serve fast food, that is, inexpensive food, prepared and served quickly. At some, you do not have to even get out of the car to eat. You can pay and get your order from a window. These places are called drive-throughs.
    
    There are also chain restaurants that serve slightly more expensive food. They are called fast casual restaurants. Applebee's and Perkins are examples of this type of chain restaurant.
    
    Haute cuisine or 'fine dining' is found in a guide, such as the Michelin Guide, the most famous restaurant guide in the world. Their 3-star rosettes are given only to restaurants with the highest standards of cooking and service. Interestingly, the Guide gives more 3-stars to Tokyo and Kyoto than to Paris, London and New York together.[1][2] Traditionally, the restaurants of top hotels such as the Hotel de Paris in Monte Carlo or the Hôtel Ritz Paris were the main places recognized for fine dining. Today, most Michelin Guide restaurants are separate establishments. `
},

    Ancient_history : {
        A_brief_of_reasturant_of_ancient_time: ` 
        
        In Ancient Greece and Rome there were small restaurant-bars offering food and drinks. They were called thermopolia (singular thermopolium). Many dwellings did not have kitchens, and eating out was an important part of socializing.
  
    In Pompeii, 158 thermopolia with service counters have been found. They were along the main road of the town and round the public spaces.[3]`
},
   References : {
       
    INTERNAL_LINK1_for_MENU_of_MY_Restaurant_MOTI_MAHAL_: `http://localhost:1234/food`,

    INTERNAL_LINK2_for_list_of_ITEMS_by_NAME: `http://localhost:1234/food/menu/title`,

    LINK1 : `https://www.google.com/maps/place/Moti+Mahal+Delux/@23.6644698,86.1479415,20z/data=!3m1!5s0x39f423b3afc5876d:0x8a3a5df1b3bd3fea!4m5!3m4!1s0x39f423b3a45d829d:0x46d807ac526b4b2b!8m2!3d23.6645159!4d86.1480917`,

    LINK2 : `https://www.popsci.com/read/food-and-health-articles`,

    LINK3:  `https://www.unitypoint.org/livewell/article.aspx?id=ff0de079-682c-4f1a-b686-6b5b50e2f541`,

    LINK4 : `https://www.hhs.gov/fitness/eat-healthy/importance-of-good-nutrition/index.html`,
    
    LINK5 : `http://www.foodincare.org.uk/eating-well/why-healthy-eating-matters`,

        }
   })
);


  module.exports = router;