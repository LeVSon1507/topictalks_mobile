import dayjs from 'dayjs';
import { ToastError } from './toastOptions';
import { Platform, ToastAndroid } from 'react-native';

export const API_KEY =
   Platform.OS === 'android' || Platform.OS === 'ios'
      ? 'http://10.0.2.2:5000/api/v1'
      : 'http://localhost:5000/api/v1';

export const APIKeyGPT = `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`;

export const AVATAR_FAKE =
   'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=';

export const DateFormatDisplayMinute = 'MM/DD/YYYY hh:mm A';

export const RE_CAPTCHA_SITE_KEY = '6LfQ3KUoAAAAAKy7R5K2DCfMEwYQy8_Qso9c5q37';

export const formatDate = (value: string, format: string = 'MM/DD/YYYY') => {
   if (!value) return '';

   return dayjs(value).format(format);
};

export const formatYear = (value: string, format: string = 'YYYY') => {
   if (!value) return '';

   return dayjs(value).format(format);
};

export const formatDateTime = (value: string, format: string = DateFormatDisplayMinute) => {
   if (!value) return '';
   return dayjs(value).format(format);
};

const isImage = ['png', 'jpg', 'svg', 'webp'];

export const handleImageUpload = (image, setImageUrl, isPost: boolean) => {
   console.log('11111');
   const data = new FormData();
   for (let i = 0; i < image.length; i++) {
      const fileExtension = image[i].name.split('.').pop().toLowerCase();
      if (isImage.includes(`${fileExtension}`)) {
         data.append('file', image[i]);
         data.append(
            'upload_preset',
            `${isPost ? 'topicchildandpost' : 'topictalk_message_image'}`
         );
         data.append('cloud_name', 'tantqdev');
         fetch('https://api.cloudinary.com/v1_1/tantqdev/image/upload', {
            method: 'post',
            body: data,
         })
            .then(res => res.json())
            .then(data => {
               setImageUrl(data?.url);
               console.log('data', data?.url);
            })
            .catch(err => {
               console.log(err);
            });
      } else {
         setImageUrl('err');
         ToastError(`Invalid file extension: ${fileExtension}`);
      }
   }
};

// export const showToastShort = (message: string) => {
//    ToastAndroid.show(message, ToastAndroid.SHORT);
// };
