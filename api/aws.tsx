global.Buffer = require('buffer').Buffer;
import axios from 'axios';
import API_URL from './baseUrl';
import RNFS from 'react-native-fs';

const imageToBinary = async (uri: string) => {
  try {
    const content = await RNFS.readFile(uri, 'base64');
    return Buffer.from(content, 'base64');
  } catch (error) {
    console.error('Error reading image content:', error);
    throw error;
  }
};

const getPresignedUrl = async (folder = '')  => {
  let randomId = Math.random().toString(36).substring(7);
  if (folder !== '') {
    randomId = `${folder}-${randomId}`;
  }
  const response = await axios.get(`${API_URL}aws/presigned-url/${randomId}`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const uploadImagesToS3 = async imagesArray => {
  try {
    const presignedUrls = await Promise.all(
      imagesArray.map(async () => await getPresignedUrl('infractions')),
    );

    const uploadPromises = imagesArray.map(async (image, index) => {
      const presignedUrl = presignedUrls[index];
      await axios.put(presignedUrl, await imageToBinary(image.uri), {
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

export const singleUploadToS3 = async (image, folder = '') => {
  try {
    const presignedUrl = await getPresignedUrl(folder);
    await axios.put(presignedUrl, await imageToBinary(image.uri), {
      headers: {
        'Content-Type': image.type,
      },
    });
    return presignedUrl.split('?')[0];
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};