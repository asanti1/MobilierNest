import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'bson';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectId> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): ObjectId {
    try {
      const id = new ObjectId(value);
      return id;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
