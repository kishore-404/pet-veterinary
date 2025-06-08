import Service_banner from "../assets/images/service/service_banner_1.png"
import surgery_img from "../assets/images/service/surgery.png"
import medicine_img from "../assets/images/service/medicine.png"
import Grooming_img from "../assets/images/service/grooming.png"
import Health_Care_img from "../assets/images/service/health_care.png"
import Day_Care_img from "../assets/images/service/daycare.png"
import Consulting_img from "../assets/images/service/consulting.png"
export const  Service_page = {
    card_1 : {
        title: "Assess Your Dog’s Body  Condition Score ",
        img : Service_banner
    },
  Health_care: {
  title: "Healthcare",
  sub_title: "Exact diagnosis of animal diseases:",
  points: [
    "Health checks",
    "Complete analysis of blood and urine",
    "Biochemical analysis of blood",
    "Ultrasound and digital radiology (X-ray)",
  ],
  img: Health_Care_img,
  faq: [
    {
      q: "When can I make an appointment for my pet’s health check?",
      a: "Appointments are available throughout the week, including weekends.",
    },
    {
      q: "How much is a pet health check appointment?",
      a: "The cost of our pet health check is 50 GEL (prices at 2023).  Any additional treatments or procedures arising are charged in addition to this.We strongly recommend joining our Pet Health Plans where the health check is included as part of the plan AND you can spread the costs of this and other routine pet healthcare costs in easy monthly payments.",
    },
    {
      q: "How long does a pet health check take?",
      a: "A standard health check takes 15–20 minutes.",
    },
    {
      q: "Who conducts the pet health check?",
      a: "The initial health check may be carried out by one of our vets or a final year veterinary student, working under the close supervision of an experienced veterinary surgeon. The vet will also examine your pet and discuss any findings or treatment required.",
    },
    {
      q: "Where does the pet health check take place?",
      a: "Pet health checks take place at the SmartCare Animal hospital (in Tbilisi, Georgia) where all of your pet’s needs can be catered for Can I book a health check for any type of pet? Yes – not only do we have a team of experienced small animal vets who focus on cats and dogs, we also have a specialist exotics team who can provide health checks for more unusual pets including birds, rodents and reptiles.",
    },
    {
      q: "How often should my pet have a health check?",
      a: "All pets should have a full health check once per year (usually at the time of their annual vaccination). We recommend that older pets (cats over ten years, dogs over eight years old) are checked every six months as they can be prone to developing age related health conditions.",
    },
    
  ]
},

    Day_care : {
        title:" Daycare  ",
        sub_title : "Animal care services :",
        points : [
            "Passive immunization with serum",
            "Micro and macro-filling therapy",
            "Blood transfusion",
            "Dietology",
            "Urgent help",
            "Rehabilitation and daily maintenance"
        ],
        img:Day_Care_img
    },
    surgery : {
        img:surgery_img
    },
     medicine : {
        img: medicine_img
    },
    consulting:{
        text:"Consulting services related to animal care",
        img: Consulting_img
    },
    Grooming : {
        title:"Grooming",
        Left_points : [
            "Brushing ...",
            "Nail clipping. ...",
            "Drying. ..."
        ],
        Right_points : [
            "Cleaning out ears. ...",
            " Coat trimming. ...",
            " Bathing. ..."
        ],
        img:Grooming_img
    }
                              

}