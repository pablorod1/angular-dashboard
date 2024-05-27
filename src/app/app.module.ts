import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgxPermissionsModule } from 'ngx-permissions';

// Pipes

// Recargar la página después de cada navegación
import { ReloadInterceptorService } from './services/reload-interceptor/reload-interceptor.service';

// Google Map
import { GoogleMap } from '@angular/google-maps';
import { MapMarker } from '@angular/google-maps';
import { MapInfoWindow } from '@angular/google-maps';

//Primeng Modules
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { InputOtpModule } from 'primeng/inputotp';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { MegaMenuModule } from 'primeng/megamenu';
import { TagModule } from 'primeng/tag';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MeterGroupModule } from 'primeng/metergroup';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { AutoFocusModule } from 'primeng/autofocus';
import { ToolbarModule } from 'primeng/toolbar';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';

// Angular Material Modules
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

// ApexCharts Module
import { NgApexchartsModule } from 'ng-apexcharts';

// Angular Editor
import { AngularEditorModule } from '@kolkov/angular-editor';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/menus/navbar/navbar.component';
import { SidebarComponent } from './components/menus/sidebar/sidebar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { NotificationsMenuComponent } from './components/menus/notifications-menu/notifications-menu.component';
import { ProfileMenuComponent } from './components/menus/profile-menu/profile-menu.component';
import { FullscreenTogglerComponent } from './components/fullscreen-toggler/fullscreen-toggler.component';
import { SigninClassicComponent } from './pages/authentication/signin/signin-classic/signin-classic.component';
import { SigninModernComponent } from './pages/authentication/signin/signin-modern/signin-modern.component';
import { SigninFullscreenComponent } from './pages/authentication/signin/signin-fullscreen/signin-fullscreen.component';
import { SignupFullscreenComponent } from './pages/authentication/signup/signup-fullscreen/signup-fullscreen.component';
import { SignupClassicComponent } from './pages/authentication/signup/signup-classic/signup-classic.component';
import { SignupModernComponent } from './pages/authentication/signup/signup-modern/signup-modern.component';
import { SignoutModernComponent } from './pages/authentication/signout/signout-modern/signout-modern.component';
import { SignoutClassicComponent } from './pages/authentication/signout/signout-classic/signout-classic.component';
import { SignoutFullscreenComponent } from './pages/authentication/signout/signout-fullscreen/signout-fullscreen.component';
import { ForgotPassFullscreenComponent } from './pages/authentication/forgot-pass/forgot-pass-fullscreen/forgot-pass-fullscreen.component';
import { ForgotPassClassicComponent } from './pages/authentication/forgot-pass/forgot-pass-classic/forgot-pass-classic.component';
import { ForgotPassModernComponent } from './pages/authentication/forgot-pass/forgot-pass-modern/forgot-pass-modern.component';
import { ResetPassClassicComponent } from './pages/authentication/reset-pass/reset-pass-classic/reset-pass-classic.component';
import { ResetPassModernComponent } from './pages/authentication/reset-pass/reset-pass-modern/reset-pass-modern.component';
import { ResetPassFullscreenComponent } from './pages/authentication/reset-pass/reset-pass-fullscreen/reset-pass-fullscreen.component';
import { UnlockFullscreenComponent } from './pages/authentication/unlock-session/unlock-fullscreen/unlock-fullscreen.component';
import { UnlockClassicComponent } from './pages/authentication/unlock-session/unlock-classic/unlock-classic.component';
import { UnlockModernComponent } from './pages/authentication/unlock-session/unlock-modern/unlock-modern.component';
import { ConfirmationClassicComponent } from './pages/authentication/confirmation/confirmation-classic/confirmation-classic.component';
import { ConfirmationModernComponent } from './pages/authentication/confirmation/confirmation-modern/confirmation-modern.component';
import { ConfirmationFullscreenComponent } from './pages/authentication/confirmation/confirmation-fullscreen/confirmation-fullscreen.component';
import { MessageMenuComponent } from './components/menus/message-menu/message-menu.component';
import { ShortcutsMenuComponent } from './components/menus/shortcuts-menu/shortcuts-menu.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssuesChartComponent } from './components/charts/issues-chart/issues-chart.component';
import { TasksChartsComponent } from './components/charts/tasks-charts/tasks-charts.component';
import { BudgetChartComponent } from './components/charts/budget-chart/budget-chart.component';
import { WeeklyExpensesComponent } from './components/charts/weekly-expenses/weekly-expenses.component';
import { MonthlyExpensesComponent } from './components/charts/monthly-expenses/monthly-expenses.component';
import { YearlyExpensesComponent } from './components/charts/yearly-expenses/yearly-expenses.component';
import { BudgetTableComponent } from './components/charts/budget-table/budget-table.component';
import { TeamMembersComponent } from './components/team/team-members/team-members.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { BalanceChartComponent } from './components/charts/balance-chart/balance-chart.component';
import { EarningsChartComponent } from './components/charts/earnings-chart/earnings-chart.component';
import { RealtimeChartComponent } from './components/charts/realtime-chart/realtime-chart.component';
import { LocationChartComponent } from './components/charts/location-chart/location-chart.component';
import { AccSettingsComponent } from './pages/acc-settings/acc-settings.component';
import { MonthlyUsersComponent } from './components/charts/monthly-users/monthly-users.component';

import { PoiComponent } from './pages/poi/poi.component';
import { EmailComposeEditorComponent } from './components/email-compose-editor/email-compose-editor.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ExploreBtnComponent } from './components/buttons/explore-btn/explore-btn.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PricingClassicComponent } from './pages/pricing/pricing-classic/pricing-classic.component';
import { PricingTableComponent } from './pages/pricing/pricing-table/pricing-table.component';
import { TeamMembersCarouselComponent } from './components/team/team-members-carousel/team-members-carousel.component';
import { FeaturesSectionComponent } from './components/features/features-section/features-section.component';
import { FaqSectionComponent } from './components/faq/faq-section/faq-section.component';
import { Error404Component } from './pages/error/error-404/error-404.component';
import { MegamenuComponent } from './components/menus/megamenu/megamenu.component';
import { FaqsComponent } from './pages/help-center/faqs/faqs.component';
import { SupportComponent } from './pages/help-center/support/support.component';
import { HelpHomeComponent } from './pages/help-center/help-home/help-home.component';
import { GuidesComponent } from './pages/help-center/guides/guides.component';
import { FaqSection2Component } from './components/faq/faq-section2/faq-section2.component';
import { GuideComponent } from './pages/help-center/guides/guide/guide.component';
import { InvoiceClassicComponent } from './pages/invoice/invoice-classic/invoice-classic.component';
import { InvoicesTableComponent } from './pages/invoice/invoices-table/invoices-table.component';
import { AboutComponent } from './pages/about/about.component';
import { TeamSectionComponent } from './components/team/team-section/team-section.component';
import { FeaturesSection2Component } from './components/features/features-section2/features-section2.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BlogPostsComponent } from './pages/blog-posts/blog-posts.component';
import { FeaturesSection3Component } from './components/features/features-section3/features-section3.component';
import { TeamSection2Component } from './components/team/team-section2/team-section2.component';
import { PricingSectionComponent } from './components/pricing/pricing-section/pricing-section.component';
import { Error500Component } from './pages/error/error-500/error-500.component';
import { MaintenanceComponent } from './pages/error/maintenance/maintenance.component';
import { TeamSection3Component } from './components/team/team-section3/team-section3.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SubscribeBtnComponent } from './components/buttons/subscribe-btn/subscribe-btn.component';
import { GuideListComponent } from './pages/help-center/guides/guide-list/guide-list.component';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ScrumboardHomeComponent } from './pages/scrumboard/scrumboard-home/scrumboard-home.component';
import { ScrumboardComponent } from './pages/scrumboard/scrumboard/scrumboard.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { EcommerceComponent } from './pages/ecommerce/ecommerce.component';
import { InventoryComponent } from './pages/ecommerce/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SearchbarComponent,
    NotificationsMenuComponent,
    ProfileMenuComponent,
    FullscreenTogglerComponent,
    SigninClassicComponent,
    SigninModernComponent,
    SigninFullscreenComponent,
    SignupFullscreenComponent,
    SignupClassicComponent,
    SignupModernComponent,
    SignoutModernComponent,
    SignoutClassicComponent,
    SignoutFullscreenComponent,
    ForgotPassFullscreenComponent,
    ForgotPassClassicComponent,
    ForgotPassModernComponent,
    ResetPassClassicComponent,
    ResetPassModernComponent,
    ResetPassFullscreenComponent,
    UnlockFullscreenComponent,
    UnlockClassicComponent,
    UnlockModernComponent,
    ConfirmationClassicComponent,
    ConfirmationModernComponent,
    ConfirmationFullscreenComponent,
    MessageMenuComponent,
    ShortcutsMenuComponent,
    MailboxComponent,
    DashboardComponent,
    IssuesChartComponent,
    TasksChartsComponent,
    BudgetChartComponent,
    WeeklyExpensesComponent,
    MonthlyExpensesComponent,
    YearlyExpensesComponent,
    BudgetTableComponent,
    TeamMembersComponent,
    AnalyticsComponent,
    BalanceChartComponent,
    EarningsChartComponent,
    RealtimeChartComponent,
    LocationChartComponent,
    AccSettingsComponent,
    MonthlyUsersComponent,
    PoiComponent,
    EmailComposeEditorComponent,
    ComingSoonComponent,
    ExploreBtnComponent,
    ProfileComponent,
    PricingClassicComponent,
    PricingTableComponent,
    TeamMembersCarouselComponent,
    FeaturesSectionComponent,
    FaqSectionComponent,
    Error404Component,
    MegamenuComponent,
    FaqsComponent,
    SupportComponent,
    HelpHomeComponent,
    GuidesComponent,
    FaqSection2Component,
    GuideComponent,
    InvoiceClassicComponent,
    InvoicesTableComponent,
    AboutComponent,
    TeamSectionComponent,
    FeaturesSection2Component,
    LandingComponent,
    BlogPostsComponent,
    FeaturesSection3Component,
    TeamSection2Component,
    PricingSectionComponent,
    Error500Component,
    MaintenanceComponent,
    TeamSection3Component,
    NewsletterComponent,
    SubscribeBtnComponent,
    GuideListComponent,
    FileManagerComponent,
    NotesComponent,
    ScrumboardHomeComponent,
    ScrumboardComponent,
    EcommerceComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    DialogModule,
    OverlayPanelModule,
    TooltipModule,
    TableModule,
    BadgeModule,
    MenuModule,
    TieredMenuModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    TabMenuModule,
    TabViewModule,
    MatTabsModule,
    NgApexchartsModule,
    ProgressBarModule,
    DropdownModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    GoogleMap,
    MapMarker,
    MapInfoWindow,
    ChipModule,
    AngularEditorModule,
    HttpClientModule,
    AccordionModule,
    InputOtpModule,
    InputMaskModule,
    ScrollingModule,
    ChipsModule,
    DividerModule,
    CarouselModule,
    RatingModule,
    MegaMenuModule,
    TagModule,
    ContextMenuModule,
    DragDropModule,
    MeterGroupModule,
    FileUploadModule,
    CardModule,
    AutoFocusModule,
    ToolbarModule,
    SliderModule,
    ListboxModule,
    NgxPermissionsModule.forRoot(),
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReloadInterceptorService,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
