import { Pipe, PipeTransform } from '@angular/core';
const PADDING = '000000';
@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    this.DECIMAL_SEPARATOR = '.';
    this.THOUSANDS_SEPARATOR = ',';
  }

  transform(
    value: number | string = 0,
    fractionSize: number = 2,
    isDecimal = false
  ): string {
    let stringed_value = value.toString();
    let fullnumber = stringed_value;
    let [integer, fraction = ''] = (stringed_value || '')
      .toString()
      .split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      this.THOUSANDS_SEPARATOR
    );
    fullnumber = fullnumber.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      this.THOUSANDS_SEPARATOR
    );
    if (fraction && fraction.length > 2) {
      fraction =
        this.DECIMAL_SEPARATOR +
        (fraction + PADDING).substring(0, fractionSize);
      fullnumber = integer + fraction;
    }
    if (isDecimal) {
      if (fraction == '') fullnumber = integer + this.DECIMAL_SEPARATOR + '00';
    }

    return fullnumber;
  }

  parse(value: string, fractionSize: number = 2): string {
    let integer = value;
    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');
    return integer;
  }

  transformNew(
    value: number | string,
    fractionSize: number = 2,
    negative_parantheses: boolean = false
  ): string {
    let transformed_number = '';
    if (value != null && value != undefined) {
      const numericValue =
        typeof value === 'string' ? parseFloat(value) : value;

      let stringed_value = value.toString();
      let fullnumber = stringed_value;
      let [integer, fraction = ''] = (stringed_value || '')
        .toString()
        .split(this.DECIMAL_SEPARATOR);

      integer = integer.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        this.THOUSANDS_SEPARATOR
      );
      fullnumber = fullnumber.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        this.THOUSANDS_SEPARATOR
      );

      if (fraction && fraction.length > 2) {
        fraction =
          this.DECIMAL_SEPARATOR +
          (fraction + PADDING).substring(0, fractionSize);
        fullnumber = integer + fraction;
      }

      transformed_number = fullnumber;

      if (numericValue < 0 && negative_parantheses) {
        if (transformed_number.charAt(0) == '-') {
          transformed_number = transformed_number.slice(1);
        }
        transformed_number = '(' + transformed_number + ')';
      }
    }

    return transformed_number;
  }
}
