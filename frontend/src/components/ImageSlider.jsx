import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../filmon.css'; 

const ImageSlider = () => {
  const images = [
    { url: 'high1.jpg', alt: 'Slide 1' },
    { url: 'high2.jpg', alt: 'Slide 2' },
    { url: 'high3.jpg', alt: 'Slide 2' },
    { url: 'high4.jpg', alt: 'Slide 2' },
    { url: 'high6.jpg', alt: 'Slide 2' },
    { url: 'high9.jpg', alt: 'Slide 2' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 0 : -0,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 0 : 0,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= images.length) newIndex = 0;
      if (newIndex < 0) newIndex = images.length - 1;
      return newIndex;
    });
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      // paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="filmon">

    
      <AnimatePresence initial={false} custom={direction}>
      <motion.div
  key={currentIndex}
  custom={direction}
  variants={slideVariants}
  initial="enter"
  animate="center"
  exit="exit"
  transition={{
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={1}
  onDragEnd={(e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  }}
  className="filmon-image-container"
>
<div className="filmon-image-container2">

<img 
src={images[currentIndex].url} 
alt={images[currentIndex].alt} 
className="filmon-image"
/>

<div className="filmon-image-controls">
<button
  onClick={() => paginate(-1)}
  className="filmon-image-arrows p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
>
  <ChevronLeft size={24} />
</button>

<div className="">
  {images.map((_, index) => (
    <button
      key={index}
      onClick={() => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
      }}
      className={`filmon-image-pagination ${
        index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
      }`}
    />
  ))}
</div>

<button
  onClick={() => paginate(1)}
  className="filmon-image-arrows p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
>
  <ChevronRight size={24} />
</button>
</div>


</div>



</motion.div>

      </AnimatePresence>


    </div>
  );
};

export default ImageSlider;