import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    // Ensure the value is a valid number
    if (isNaN(value)) {
      return '00:00';
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    // Format minutes and seconds to ensure two digits (e.g., 05:09 instead of 5:9)
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Return formatted time
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
