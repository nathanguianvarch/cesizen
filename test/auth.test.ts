import { verifyEmailSyntax, verifyPasswordMatch } from "@/tools/auth";
import {expect, test} from '@jest/globals';

test('verify email syntax of admin@admin.com', () => {
  expect(verifyEmailSyntax("admin@admin.com")).toBe("");
});
test('verify email syntax of admin', () => {
  expect(verifyEmailSyntax("admin")).toBe("Vérifiez le format de votre email.");
});

test('verify passwords match test123 and test123', () => {
  expect(verifyPasswordMatch("test123", "test123")).toBe("");
});
test('verify passwords match test123 and test', () => {
  expect(verifyPasswordMatch("test123", "test")).toBe("Le mot de passe de confirmation ne correspond pas.");
});