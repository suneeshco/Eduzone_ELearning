import React , {useEffect,useState} from 'react'
import { adminApiRequest } from '../../../api/axios';

const TopCategories = () => {

    interface Category {
        _id: string;
        categoryName: string;
      }


      const [category, setCategory] = useState<Category[]>([])


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await adminApiRequest({
              method: 'get',
              url: '/activeCategories',
            });
    
            setCategory(response);
          } catch (error) {
            console.error("Failed to fetch categories:", error);
          }
        };
    
        fetchData();
      }, []);


  return (
    <div className="mx-4 md:mx-40 my-8 md:my-20 border-b pb-8 md:pb-16">
  <h1 className="text-2xl md:text-4xl text-white font-bold mb-4 md:mb-7">Top Categories</h1>
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-2 md:px-4">
    {category.map(categ => (
      <div key={categ._id} className="border border-gray-400 flex items-center justify-center text-white py-2 md:py-3">
        <span className="text-xs md:text-sm">{categ.categoryName}</span>
      </div>
    ))}
  </div>
</div>

  )
}

export default TopCategories
