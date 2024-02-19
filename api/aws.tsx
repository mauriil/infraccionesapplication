import axios from 'axios';
import API_URL from './baseUrl';

const getPresignedUrl = async image => {
  const response = await axios.get(`${API_URL}presigned-url/${image.name}`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const uploadImagesToS3 = async imagesArray => {
  try {
    const presignedUrls = await Promise.all(
      imagesArray.map(image => getPresignedUrl(image)),
    );

    const uploadPromises = imagesArray.map(async (image, index) => {
      const presignedUrl = presignedUrls[index];
      await axios.put(presignedUrl, image, {
        headers: {
          'Content-Type': image.type,
        },
      });
      return presignedUrl.split('?')[0];
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
