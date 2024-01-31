import { FaCamera } from 'react-icons/fa'
import { AppImages } from '../../utils/lib/images';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import { useState } from 'react';

interface Props {
    image?: any;
    setState?: any;
}

const ProfileAvatar = ({ image, setState }: Props) => {

    const [showImage, setShowImage] = useState(false);

    const handleSelectImage = (e: any) => {
        const image = e.target.files[0];
        setState((prevState: any) => ({
            ...prevState,
            imageUrl: image
        }));
        const reader = new FileReader();
        reader.onload = () => {
            const imageFile = reader.result;
            setState((prevState: any) => ({
                ...prevState,
                image: imageFile,
            }));
        }
        reader.readAsDataURL(image);
    }


    return (
        <div className="relative w-[120px] h-[120px]">
            <img onClick={() => setShowImage(true)} src={image ?? AppImages.Profile} className="w-[120px] h-[120px] rounded-full mb-3 outline outline-2 outline-offset-2 outline-green-500" />
            <label htmlFor='getFile' className="absolute right-0 bottom-0 bg-white border border-gray-100 shadow-sm w-8 h-8 flex items-center justify-center rounded-full">
                <FaCamera size={15} />
            </label>
            <input id='getFile' type='file' name="profile" value='' onChange={handleSelectImage} accept="image/png, image/jpeg" hidden />
            {
                showImage && <Lightbox
                    open={showImage}
                    close={() => setShowImage(false)}
                    slides={[{ src: image ?? AppImages.Profile }]}
                    plugins={[Fullscreen]}
                    controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                    render={{
                        buttonPrev: () => null,
                        buttonNext: () => null,
                    }}
                />
            }
        </div>
    )
}

export default ProfileAvatar