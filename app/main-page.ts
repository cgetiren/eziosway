import { EventData, Page } from '@nativescript/core';
import { GameViewModel } from './main-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new GameViewModel();
}