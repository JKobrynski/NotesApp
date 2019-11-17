import {NativeModules, Platform} from 'react-native';
const Aes = NativeModules.Aes;

export const genRandomKey = () => Aes.randomKey(32);

export const generateKey = (password, salt, cost, length) =>
  Aes.pbkdf2(password, salt, cost, length);

export const encrypt = (text, key) => {
  return Aes.randomKey(32).then(iv => {
    return Aes.encrypt(text, key, iv).then(cipher => ({
      cipher,
      iv,
    }));
  });
};

export const decrypt = (encryptedData, key) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

export const encryptData = async (text, myKey) => {
  try {
    const secret = await Aes.sha256(myKey);
    const salt = await Aes.hmac256(myKey, secret);

    const key = await generateKey(secret, salt, 5000, 512);
    const {cipher, iv} = await encrypt(text, key);

    return {cipher, iv};
  } catch (e) {
    return;
  }
};

export const decryptData = async (data, myKey) => {
  try {
    const secret = await Aes.sha256(myKey);
    const salt = await Aes.hmac256(myKey, secret);

    const key = await generateKey(secret, salt, 5000, 512);
    const text = await decrypt(data, key);

    return text;
  } catch (e) {
    return e;
  }
};
