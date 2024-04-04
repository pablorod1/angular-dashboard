import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import {ProgressBarModule} from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';
import {ChipModule} from 'primeng/chip';
import {AccordionModule} from 'primeng/accordion';

// Angular Material Modules
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

// ApexCharts Module
import {NgApexchartsModule} from 'ng-apexcharts';

// Angular Editor
import { AngularEditorModule } from '@kolkov/angular-editor';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { NotificationsMenuComponent } from './components/notifications-menu/notifications-menu.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
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
import { MessageMenuComponent } from './components/message-menu/message-menu.component';
import { ShortcutsMenuComponent } from './components/shortcuts-menu/shortcuts-menu.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssuesChartComponent } from './components/issues-chart/issues-chart.component';
import { TasksChartsComponent } from './components/tasks-charts/tasks-charts.component';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';
import { WeeklyExpensesComponent } from './components/weekly-expenses/weekly-expenses.component';
import { MonthlyExpensesComponent } from './components/monthly-expenses/monthly-expenses.component';
import { YearlyExpensesComponent } from './components/yearly-expenses/yearly-expenses.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { EarningsChartComponent } from './components/earnings-chart/earnings-chart.component';
import { RealtimeChartComponent } from './components/realtime-chart/realtime-chart.component';
import { LocationChartComponent } from './components/location-chart/location-chart.component';
import { AccSettingsComponent } from './pages/acc-settings/acc-settings.component';
import { MonthlyUsersComponent } from './components/monthly-users/monthly-users.component';

import { PoiComponent } from './pages/poi/poi.component';
import { EmailComposeEditorComponent } from './components/email-compose-editor/email-compose-editor.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ExploreBtnComponent } from './components/buttons/explore-btn/explore-btn.component';



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
    AccordionModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
