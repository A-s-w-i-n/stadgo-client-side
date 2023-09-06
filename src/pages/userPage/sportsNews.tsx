import axios from 'axios'
import  {  useState } from 'react'
import UserNav from '../../components/navbar/userNav';
// import  { apiAuth } from '../../servises/api/axios interceptor ';

const SportsNews = () => {

    const [news,setNews] = useState([])


    const apiKey = "e28524ffbf40082c4c73237a19fb219e";
let  apiCalls = 0;
const maxApiCalls = 5;

const fetchingNews = async () => {
  if (apiCalls >= maxApiCalls) {
    console.log("Reached the maximum number of API calls for today.");
    return;
  }

  try {
    const news = await axios.get(`https://gnews.io/api/v4/top-headlines?country=in&category=sports&apikey=${apiKey}`);
    console.log(news.data);
setNews(news.data)
    apiCalls++; // Increment the API call counter
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
console.log(news,"aa");


// Schedule the initial API call and set the time interval
// const apiCallInterval = 24 * 60 * 60 * 1000 / maxApiCalls; // 24 hours divided by maxApiCalls
fetchingNews(); // Initial call
// const intervalId = setInterval(fetchingNews, apiCallInterval);


// const result = apiAuth.post('/stadium/news')
    
  return (
    <div>
        <UserNav/>
      <div className='w-full h-screen'>
<button className='bg-white w-10' onClick={fetchingNews}>news</button>

{news.map(()=>(
    <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
      alt="ui/ux review check"
    />
  </div>
  <div className="p-6">
    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
      
    </h4>
    <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
      Because it's about motivating the doers. Because I'm here to follow my
      dreams and inspire others.
    </p>
  </div>
  <div className="flex items-center justify-between p-6">
    <div className="flex items-center -space-x-3">
      <img
        alt="natali craig"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
        data-tooltip-target="author-1"
        />
      <div
        data-tooltip="author-1"
        className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
        >
        Natali Craig
      </div>
      <img
        alt="tania andrew"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
        data-tooltip-target="author-2"
        />
      <div
        data-tooltip="author-2"
        className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
        >
        Tania Andrew
      </div>
    </div>
    <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
      January 10
    </p>
  </div>
</div>
      ))}
      </div>
    </div>
  )
}

export default SportsNews
