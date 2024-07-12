import crypto from "crypto";
import { AES, enc } from "crypto-js";

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPasswordBySalt(password, salt);
  return { hash, salt };
};

export const hashPasswordBySalt = (password: string, salt: string) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
};

interface VerifiedPasswordProps {
  canditatePassword: string;
  salt: string;
  hash: string;
}
export const verifyPassword = ({
  canditatePassword,
  salt,
  hash,
}: VerifiedPasswordProps) => {
  const candidateHash = crypto
    .pbkdf2Sync(canditatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return candidateHash === hash;
};

export const encryptText = (text: string, secretKey: string) => {
  // Encrypt
  return AES.encrypt(text, secretKey).toString();
};

export const decryptText = (cryptedText: string, secretKey: string) => {
  // Decrypt
  const bytes = AES.decrypt(cryptedText, secretKey);
  const originalText = bytes.toString(enc.Utf8);
  return originalText;
};
