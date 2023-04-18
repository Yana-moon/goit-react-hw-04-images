//import { Component } from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapper } from './App.styled';
import { resultSearch } from './Api/Api';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';

//export class App extends Component {
  //state = {
   // searchName: '',
   // pictures: [],
   // currentPage: 1,
    //per_page: 12,
    //isOpen: false,
    //largeImage: '',
    //isLoading: false,
  //};

  export const App = () => {
    const [searchName, setSearchName] = useState('');
    const [pictures, setPictures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [per_page] = useState(12);
    const [isOpen, setIsOpen] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const options = {
      searchName: searchName,
      currentPage: currentPage,
    };

    if (
      searchName  || currentPage !== 1) {
      async function getImages() {
      try {
        const response = await resultSearch(options);
        const arr = response.hits.map(el => ({
          tags: el.tags,
          webformatURL: el.webformatURL,
          largeImageURL: el.largeImageURL,
          id: el.id,
        }));

        if (arr && arr.length > 0) {
            setPictures ( prev => [...prev,  ...arr]);
            setIsLoading(false);
        }
        if (arr.length === 0) {
            setIsLoading(false);
          return toast.error(
            `Sorry, we didn't find picture including such name. Please try again.`,
          );
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(
          'Sorry, something wrong. Try again later', error);
      }
    }
  
  getImages();
}
}, [searchName, currentPage]);

const  handleSubmit =  name  => {
    if (name !== searchName && name) {
        setSearchName(name);
        setCurrentPage(1);
        setPictures([]);
        setIsLoading(true);
    }
  };

  const handleBigImg = img => {
      setLargeImage(img);
      setIsOpen(true);
  };

  const onClose = () => {
      setIsOpen(false);
  };

  const loadMoreCards = () => {
    setCurrentPage(prev => prev +1);
    setIsLoading(true);
  };

  const onButtonVisible = () => {
    if (pictures && pictures.length < Number(currentPage * per_page)
    ) {
      return false;
    } else return true;
  };
  
  return (
      <AppWrapper>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery pictures={pictures} onBigImg={handleBigImg} />
                {isOpen && 
          <Modal largeImage={largeImage} onClose={onClose} />
        }
        {onButtonVisible() && 
          <Button onClickButton={loadMoreCards} />
        }
        {isLoading && <Loader />}
      </AppWrapper>
    );
        };


