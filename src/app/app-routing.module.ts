import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication Components
import { ConfirmationClassicComponent } from './pages/authentication/confirmation/confirmation-classic/confirmation-classic.component';
import { ConfirmationModernComponent } from './pages/authentication/confirmation/confirmation-modern/confirmation-modern.component';
import { ConfirmationFullscreenComponent } from './pages/authentication/confirmation/confirmation-fullscreen/confirmation-fullscreen.component';
import { ForgotPassClassicComponent } from './pages/authentication/forgot-pass/forgot-pass-classic/forgot-pass-classic.component';
import { ForgotPassModernComponent } from './pages/authentication/forgot-pass/forgot-pass-modern/forgot-pass-modern.component';
import { ForgotPassFullscreenComponent } from './pages/authentication/forgot-pass/forgot-pass-fullscreen/forgot-pass-fullscreen.component';
import { ResetPassClassicComponent } from './pages/authentication/reset-pass/reset-pass-classic/reset-pass-classic.component';
import { ResetPassModernComponent } from './pages/authentication/reset-pass/reset-pass-modern/reset-pass-modern.component';
import { ResetPassFullscreenComponent } from './pages/authentication/reset-pass/reset-pass-fullscreen/reset-pass-fullscreen.component';
import { SigninClassicComponent } from './pages/authentication/signin/signin-classic/signin-classic.component';
import { SigninModernComponent } from './pages/authentication/signin/signin-modern/signin-modern.component';
import { SigninFullscreenComponent } from './pages/authentication/signin/signin-fullscreen/signin-fullscreen.component';
import { SignupClassicComponent } from './pages/authentication/signup/signup-classic/signup-classic.component';
import { SignupModernComponent } from './pages/authentication/signup/signup-modern/signup-modern.component';
import { SignupFullscreenComponent } from './pages/authentication/signup/signup-fullscreen/signup-fullscreen.component';
import { SignoutClassicComponent } from './pages/authentication/signout/signout-classic/signout-classic.component';
import { SignoutModernComponent } from './pages/authentication/signout/signout-modern/signout-modern.component';
import { SignoutFullscreenComponent } from './pages/authentication/signout/signout-fullscreen/signout-fullscreen.component';
import { UnlockClassicComponent } from './pages/authentication/unlock-session/unlock-classic/unlock-classic.component';
import { UnlockModernComponent } from './pages/authentication/unlock-session/unlock-modern/unlock-modern.component';
import { UnlockFullscreenComponent } from './pages/authentication/unlock-session/unlock-fullscreen/unlock-fullscreen.component';

// Comming Soon
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

//Dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { PoiComponent } from './pages/poi/poi.component';


//MailBox
import { MailboxComponent } from './pages/mailbox/mailbox.component';

// Account Settings
import { AccSettingsComponent } from './pages/acc-settings/acc-settings.component';

// Invoice Page
import { InvoiceComponent } from './pages/invoice/invoice.component';

// User Profile
import { ProfileComponent } from './pages/profile/profile.component';
import { PricingClassicComponent } from './pages/pricing/pricing-classic/pricing-classic.component';
import { PricingTableComponent } from './pages/pricing/pricing-table/pricing-table.component';

// Errors
import { Error404Component } from './pages/error/error-404/error-404.component';

const routes: Routes = [
  {path: '', redirectTo: '/error-404', pathMatch: 'full'},

  // Dashboard Paths
  {path: 'dashboard', component: DashboardComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'poi', component: PoiComponent},
  // Authentication Paths
  // Confirmation Paths
  {path: 'confirmation-classic', component: ConfirmationClassicComponent},
  {path: 'confirmation-modern', component: ConfirmationModernComponent},
  {path: 'confirmation-fullscreen', component: ConfirmationFullscreenComponent},
  // Forgot Password Paths
  {path: 'forgot-classic', component: ForgotPassClassicComponent},
  {path: 'forgot-modern', component: ForgotPassModernComponent},
  {path: 'forgot-fullscreen', component: ForgotPassFullscreenComponent},
  // Reset Password Paths
  {path: 'reset-classic', component: ResetPassClassicComponent},
  {path: 'reset-modern', component: ResetPassModernComponent},
  {path: 'reset-fullscreen', component: ResetPassFullscreenComponent},
  // Signin Paths
  {path: 'signin-classic', component: SigninClassicComponent},
  {path: 'signin-modern', component: SigninModernComponent},
  {path: 'signin-fullscreen', component: SigninFullscreenComponent},
  // Signup Paths
  {path: 'signup-classic', component: SignupClassicComponent},
  {path: 'signup-modern', component: SignupModernComponent},
  {path: 'signup-fullscreen', component: SignupFullscreenComponent},
  // Signout Paths
  {path: 'signout-classic', component: SignoutClassicComponent},
  {path: 'signout-modern', component: SignoutModernComponent},
  {path: 'signout-fullscreen', component: SignoutFullscreenComponent},
  // Unlock Session Paths
  {path: 'unlock-classic', component: UnlockClassicComponent},
  {path: 'unlock-modern', component: UnlockModernComponent},
  {path: 'unlock-fullscreen', component: UnlockFullscreenComponent},
  // Comming Soon Paths
  {path: 'coming-soon', component: ComingSoonComponent},

  // MailBox Path
  {path: 'mailbox', component: MailboxComponent},
  // Account Settings Path
  {path: 'acc-settings', component: AccSettingsComponent},
  // Invoice Page
  {path: 'invoice', component: InvoiceComponent},
  // User Profile
  {path: 'profile', component: ProfileComponent},
  // Pricing Paths
  {path: 'pricing-classic', component: PricingClassicComponent},
  {path: 'pricing-table', component: PricingTableComponent},
  // Errors
  // 404
  {path: 'error-404', component: Error404Component},

  {path: '**', redirectTo: '/error-404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
