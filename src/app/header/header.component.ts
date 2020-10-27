import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  styleUrls: ["./header.component.css"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListnerSub: Subscription;
  constructor(private authService: AuthService) {}
  private userIsAuthenticated = false;
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListnerSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
