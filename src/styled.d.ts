// src/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        backgroundColor: string;
        color: string;
        appBarColor: string;
        controlButtonColor: string;
        controlButtonHoverColor: string;
    }
}
