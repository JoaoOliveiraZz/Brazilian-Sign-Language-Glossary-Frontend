import { BotOff} from 'lucide-react';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getIconSize = () => {
    if (screenWidth >= 1200) return 128;
    if (screenWidth >= 768) return 64;
    return 48;
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <BotOff className='text-gray-500' size={getIconSize()}/>
      <h1 className='text-center text-5xl text-gray-500 lg:text-8xl md:text-7xl' >Erro</h1>
      <h1 className='text-center text-5xl text-green-500 lg:text-8xl md:text-7xl' >404!</h1>
    </div>
  )
}

export default ErrorPage