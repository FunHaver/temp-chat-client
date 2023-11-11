import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'room/:id',
        component: ChatRoomComponent
    },
    { 
        path: "**", 
        component: PageNotFoundComponent 
    } 
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{bindToComponentInputs: true})],
    exports: [RouterModule]
})

export class AppRoutingModule{}