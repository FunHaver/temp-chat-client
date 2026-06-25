import { Pipe, PipeTransform } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Pipe({ name: 'formatTimestamp', standalone: true })
export class FormatTimestampPipe implements PipeTransform {
  transform(value: Dayjs | string): string {
    return dayjs(value).format('h:mm A MM/DD/YYYY');
  }
}
