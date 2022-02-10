sp.CreateTimer("CornerCheck",
                         0,
                         200,
                         `var mousePos = sp.GetCurrentMousePoint();
                        var mouseScreen = Screen.FromPoint(mousePos);
                        if(mousePos.X == mouseScreen.Bounds.Right - 1 && mousePos.Y > mouseScreen.Bounds.Top + 10 && mousePos.Y < mouseScreen.Bounds.Bottom - 10) {
                            //Right
                            sp.MouseMove(new Point(1, mousePos.Y));
                        } else if(mousePos.X == mouseScreen.Bounds.Left && mousePos.Y > mouseScreen.Bounds.Top + 10 && mousePos.Y < mouseScreen.Bounds.Bottom - 10) {
                            //Left
                            sp.MouseMove(new Point(mouseScreen.Bounds.Right  - 14, mousePos.Y));
                        } else if(mousePos.Y == mouseScreen.Bounds.Top && mousePos.X > mouseScreen.Bounds.Left + 10 && mousePos.X < mouseScreen.Bounds.Right - 10) {
                            //Top
                            sp.MouseMove(new Point(mousePos.X, mouseScreen.Bounds.Bottom  - 18));
                        } else if(mousePos.Y == mouseScreen.Bounds.Bottom - 1 && mousePos.X > mouseScreen.Bounds.Left + 10 && mousePos.X <  mouseScreen.Bounds.Right - 10) {
                            //Bottom
                            sp.MouseMove(new Point(mousePos.X, 1));
                        }`
);
