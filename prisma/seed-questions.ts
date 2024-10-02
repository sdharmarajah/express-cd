import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      {
        answer_index: "1",
        area: "Math",
        image_in_question: false,
        question_image_description: "A triangle image",
        image_in_answers: false,
        question: "What is the sum of the angles in a triangle?",
        question_si: "", 
        question_ta: "", 
        answer_1: "90 degrees",
        answer_1_si: "", 
        answer_1_ta: "", 
        answer_2: "180 degrees",
        answer_2_si: "", 
        answer_2_ta: "", 
        answer_3: "360 degrees",
        answer_3_si: "", 
        answer_3_ta: "", 
        description_answer_image_1: "",
        description_answer_image_2: "", 
        description_answer_image_3: "", 
        v_text: "Explanation of the answer",
        v_text_si: "", 
        v_text_ta: "", 
        v_image_steps: "Step-by-step visual explanation",
        a_text: "Additional text",
        a_text_si: "", 
        a_text_ta: "", 
        k_text: "Key takeaway",
        k_text_si: "", 
        k_text_ta: "", 
        quiz_id: null,  
        status: "INCOMPLEtE",
        rejected : false,
      },
      // Add more question entries as needed...
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
