export default class Generator {
  static idBaseRamdom(): number {
    return Math.floor(Math.random() * 1000000);
  }
  static idBaseTime(): number {
    return new Date().getTime();
  }
  static idBaseUuid(slots: number = 1): string {
    let generated = [];
    for (let i = 0; i < slots; i++) {
      generated.push(Math.random().toString(36).substring(2));
    }

    return generated.join('-');
  }
}