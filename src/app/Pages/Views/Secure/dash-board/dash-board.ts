import { Component } from '@angular/core';
import { DashBoardFooter } from "../../../Layout/Secure/dash-board-footer/dash-board-footer";
import { DashBoardHeader } from "../../../Layout/Secure/dash-board-header/dash-board-header";
import { DashboardSidebar } from "../../../Layout/Secure/dashboard-sidebar/dashboard-sidebar";

@Component({
  selector: 'app-dash-board',
  imports: [DashBoardFooter, DashboardSidebar, DashBoardHeader],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css'
})
export class DashBoard {

}
