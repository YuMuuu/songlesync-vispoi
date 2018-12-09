function rgb2Int(r, g, b) {
    // tslint:disable-next-line:no-bitwise
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
