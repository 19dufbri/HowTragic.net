declare namespace IndexCssNamespace {
  export interface IIndexCss {
    applet: string;
    italicA: string;
    mb0: string;
    taCenter: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
