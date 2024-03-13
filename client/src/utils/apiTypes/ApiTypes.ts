export interface UserData{
  _id : string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    password: string;
    confirmPassword: string;
  }

  export interface InstructorData{
    _id :string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    password: string;
    confirmPassword: string;
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
   