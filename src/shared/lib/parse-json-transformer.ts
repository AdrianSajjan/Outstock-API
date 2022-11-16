import { BadRequestException } from '@nestjs/common';

export function parseJson(options: { key: string; value: string; obj: string | Record<string, any> }): Record<string, any> {
  try {
    return JSON.parse(options.value);
  } catch (e) {
    throw new BadRequestException(`${options.key} contains invalid JSON `);
  }
}
