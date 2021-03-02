import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [{ path: 'play', component: PlayComponent, runGuardsAndResolvers: 'paramsChange' },
{ path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
