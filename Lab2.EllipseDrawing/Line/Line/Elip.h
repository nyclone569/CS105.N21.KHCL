#pragma once
#include<afxwin.h>
class Elip
{
public:
	void ElipBresenham(CDC* pDC,int xc, int yc,int a,int b, COLORREF color);
	void ElipMidPoint(CDC* pDC, int xc, int yc, int a, int b, COLORREF color);
	// viết riêng một lớp tô màu chứ đừng viết hàm tô màu vô đây để còn tô màu cho các hình khác.
};

