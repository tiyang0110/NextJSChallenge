"use server";

export async function handleForm(prevState:any, formData: FormData){
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  console.log(formData.get('password'));
  
  return formData.get('password') === '12345' ? { errors: [], success: true } : { errors: ['패스워드가 틀렸습니다.'], success: false };
}