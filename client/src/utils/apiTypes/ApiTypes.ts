export interface UserData{
  _id : string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    password: string;
    confirmPassword: string;
    status:boolean;
    photo : string;
    role : string;
  }

  export interface InstructorData{
    _id :string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    password: string;
    confirmPassword: string;
    status: boolean;
    photo: string;
    role : string;
  }

  export interface AdminData{
    email: string;
    password: string;
  }


  export interface Category {
    categoryName: string;
    status: boolean;
    _id:string;
   }


export interface Course {
    _id : string;
    courseName : string;
    courseDuration : string;
    courseFee : number;
    courseDescription : string;
    category : string;
    imageUrl : string;
    instructorId : any;
    createdAt:Date;
    rating: number;
  }
   