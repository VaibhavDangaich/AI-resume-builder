import { Notebook } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TiltedCard from './../../components/ui/TiltedCard';

function ResumeCardItem({ resume }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBgPos((prev) => ({
        x: prev.x + 3,  // Moves faster (previously 1.5)
        y: prev.y + 3,
      }));
    }, 30);  // Faster interval (previously 50ms)

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
    setBgPos({ x: e.clientX / 8, y: e.clientY / 8 }); // Reacts faster (previously /15)
  };

  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <TiltedCard
        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
        altText={resume.title}
        captionText={resume.title}
        containerHeight="280px"
        containerWidth="200px"
        imageHeight="280px"
        imageWidth="200px"
        rotateAmplitude={15}  // More rotation (previously 12)
        scaleOnHover={1.3}  // Stronger hover effect (previously 1.2)
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-black text-lg font-semibold text-center">
            {resume.title}
          </div>
        }
      />
    </Link>
  );
}

export default ResumeCardItem;
