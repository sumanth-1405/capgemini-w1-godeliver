import { Component, OnInit } from "@angular/core";
import { BookService } from "../book.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  curUser: any;
  noUser: any;
  curuser: any;
  search: string = "shivam";
  title: any;
  admin:any;

  constructor(private bookService: BookService,
              private router:Router
    ) { }

  ngOnInit() {
    if (localStorage.getItem("currentUserEmail") !== null) {
      this.curUser = JSON.parse(localStorage.getItem("currentUserEmail"));
      console.log(this.curUser);
      this.noUser = "";
    } else {
      this.noUser = "NoUser";
    }
    
  }

  //logout function to remove the user details from local storage
  logout() {
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserToken");
    location.reload();
    this.noUser = "NoUser";
  }

  wishlistRoute() {
    this.router.navigate(['/wishlist']);
    location.reload();
  }

  cartRoute() {
    this.router.navigate(['/cart']);
    location.reload();
  }
}
