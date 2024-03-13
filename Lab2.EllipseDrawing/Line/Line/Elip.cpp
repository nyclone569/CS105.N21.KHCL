#include "pch.h"
#include "Elip.h"

void Elip::ElipBresenham(CDC* pDC, int xc, int yc, int a, int b, COLORREF color) {
	int x = 0;
	int y = b;
	float p = a*a* (1 - 2 * b) + b*b;
	float x0 = a*a / sqrt(a*a + b*b);
	SetPixel(pDC->m_hDC, xc + x, yc + y, color);
	SetPixel(pDC->m_hDC, xc + x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc + y, color);

	while (x <= x0) {
		if (p >= 0) {// chọn S
			p += 2 * b*b * (2 * x + 3) + 4 * a * a * (1 - y);
			y--;
		}
		else {// chọn P
			p += 2 * b * b * (2 * x + 3);
		}
		x += 1;
		SetPixel(pDC->m_hDC, xc + x, yc + y, color);
		SetPixel(pDC->m_hDC, xc + x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	}


	x = a;
	y = 0;
	p = pow(b, 2) * (1 - 2 * a) + pow(a, 2);
	SetPixel(pDC->m_hDC, xc + x, yc + y, color);
	SetPixel(pDC->m_hDC, xc + x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc + y, color);

	while (x > x0) {
		if (p >= 0) {
			p += 2 * pow(a, 2) * (2 * y + 3) + 4 * b * b * (1 - x);
			x--;
		}
		else {
			p += 2 * a * a * (2 * y + 3);
		}
		y += 1;
		SetPixel(pDC->m_hDC, xc + x, yc + y, color);
		SetPixel(pDC->m_hDC, xc + x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	}
}
void Elip::ElipMidPoint(CDC* pDC, int xc, int yc, int a, int b, COLORREF color) {
	int x = 0;
	int y = b;
	float p = pow(b, 2) - a * a * b + a * a / 4;
	float x0 = a * a / sqrt(a * a + b * b);
	SetPixel(pDC->m_hDC, xc + x, yc + y, color);// vẽ điểm đầu tiên 3 điểm kia lấy đối xứng qua điểm này
	SetPixel(pDC->m_hDC, xc + x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	while (x < x0) {
		if (p < 0) {
			p += (2 * x + 3) * b * b;
		}
		else {
			p += (2 * x + 3) * b * b - 2 * a * a * (y - 1);
			y--;
		}
		x++;
		SetPixel(pDC->m_hDC, xc + x, yc + y, color);//vẽ dc 1 điểm sẽ vẽ dc 4 điểm đối xứng còn lại 
		SetPixel(pDC->m_hDC, xc + x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	}
	y = 0;
	x = a;
	p = pow(a, 2) - b * b * a + b * b / 4;
	SetPixel(pDC->m_hDC, xc + x, yc + y, color);// vẽ điểm đầu tiên 3 điểm kia lấy đối xứng qua điểm này
	SetPixel(pDC->m_hDC, xc + x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc - y, color);
	SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	while (x >= x0) {
		if (p < 0) {
			p += (2 * y + 3) * a * a;
		}
		else {
			p += (2 * y + 3) * a * a - 2 * b * b * (x - 1);
			x--;
		}
		y++;
		SetPixel(pDC->m_hDC, xc + x, yc + y, color);//vẽ dc 1 điểm sẽ vẽ dc 4 điểm đối xứng còn lại 
		SetPixel(pDC->m_hDC, xc + x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc + y, color);
	}
}

