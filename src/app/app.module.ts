import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { GridAddItemComponent } from './examples/grid-additem.component';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridColspanComponent } from './examples/grid-colspan.component';
import { GridEditorComponent } from './examples/grid-editor.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';
import { GridGroupingComponent } from './examples/grid-grouping.component';
import { GridHeaderMenuComponent } from './examples/grid-headermenu.component';
import { GridHeaderButtonComponent } from './examples/grid-headerbutton.component';
import { GridLocalizationComponent } from './examples/grid-localization.component';
import { GridMenuComponent } from './examples/grid-menu.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridRowMoveComponent } from './examples/grid-rowmove.component';
import { GridRowSelectionComponent } from './examples/grid-rowselection.component';
import { GridStateComponent } from './examples/grid-state.component';
import { HomeComponent } from './examples/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector, APP_INITIALIZER, NgModule } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SwtCommonGridTestComponent } from './examples/swt-common-grid-test.component';
import { SwtCommonGridPaginationComponent } from './examples/swt-common-grid-pagination.component';
import { SwtCommonGridComponent } from './examples/swt-common-grid.component';

import { AppComponent } from './app.component';
import { AngularSlickgridModule } from 'angular-slickgrid';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// use an Initializer Factory as describe here: https://github.com/ngx-translate/core/issues/517#issuecomment-299637956
export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'en';
      translate.setDefaultLang('en');
      translate.use(langToSet).subscribe(() => {
        // console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    GridAddItemComponent,
    GridBasicComponent,
    GridEditorComponent,
    GridClientSideComponent,
    GridColspanComponent,
    GridFormatterComponent,
    GridGraphqlComponent,
    GridGroupingComponent,
    GridHeaderButtonComponent,
    GridHeaderMenuComponent,
    GridLocalizationComponent,
    GridMenuComponent,
    GridOdataComponent,
    GridRowMoveComponent,
    GridRowSelectionComponent,
    GridStateComponent,
    SwtCommonGridTestComponent,
    SwtCommonGridPaginationComponent,
    SwtCommonGridComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
