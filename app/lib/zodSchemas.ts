import { conformZodMessage } from '@conform-to/zod';
import { z } from 'zod';

export const onboardingSchema = z.object({
  fullName: z
    .string({ message: 'Tên là bắt buộc' })
    .min(3, { message: 'Tên phải có ít nhất 3 kí tự' })
    .max(150, { message: 'Tên không được vượt quá 150 kí tự' }),

  userName: z
    .string({ message: 'Username là bắt buộc' })
    .min(3, { message: 'Username phải có ít nhất 3 kí tự' })
    .max(150, { message: 'Username không được vượt quá 150 kí tự' })
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Username chỉ cho phép các kí tự thường, chữ số và dấu gạch ngang',
    }),
});

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string({ message: 'Username là bắt buộc' })
      .min(3, { message: 'Username phải có ít nhất 3 kí tự' })
      .max(150, { message: 'Username không được vượt quá 150 kí tự' })
      .regex(/^[a-z0-9-]+$/, {
        message:
          'Username chỉ cho phép các kí tự thường, chữ số và dấu gạch ngang',
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== 'function') {
            ctx.addIssue({
              code: 'custom',
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: 'custom',
                message: 'Username đã tồn tại',
              });
            }
          });
        }),
      ),
    fullName: z
      .string({ message: 'Tên là bắt buộc' })
      .min(3, { message: 'Tên phải có ít nhất 3 kí tự' })
      .max(150, { message: 'Tên không được vượt quá 150 kí tự' }),
  });
}
