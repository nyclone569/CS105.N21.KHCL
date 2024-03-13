
// Line.h : main header file for the Line application
//
#pragma once

#ifndef __AFXWIN_H__
	#error "include 'pch.h' before including this file for PCH"
#endif

#include "resource.h"       // main symbols


// CLineApp:
// See Line.cpp for the implementation of this class
//

class CLineApp : public CWinApp
{
public:
	CLineApp() noexcept;
	virtual void _LineDDA1(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
	{
		pDC->SetPixel(x1, y1, color);
		float m = (float)(y2 - y1) / (x2 - x1);
		float y = y1;

		while (x1 < x2)
		{
			x1++;
			y += m;
			pDC->SetPixel(x1, round(y), color);
		}
	}
	virtual void _LineDDA2(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
	{
		pDC->SetPixel(x1, y1, color);
		float k = (float)(x2 - x1) / (y2 - y1);
		float x = x1;

		while (y1 < y2)
		{
			y1++;
			x += k;
			pDC->SetPixel(round(x), y1, color);
		}
	}
	virtual void  DrawLineDDA(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
	{
		if ((x1 == x2) && (y1 == y2)) 
		{
			pDC->SetPixel(x1, y1, color);
			return;
		}

		if (abs(x2 - x1) >= abs(y2 - y1))
		{
			if (x1 <= x2)
				_LineDDA1(pDC, x1, y1, x2, y2, color);
			else
				_LineDDA1(pDC, x2, y2, x1, y1, color);
		}
		else
		{
			if (y1 <= y2)
				_LineDDA2(pDC, x1, y1, x2, y2, color);
			else
				_LineDDA2(pDC, x2, y2, x1, y1, color);
		}
	}
	virtual void DrawLineBresenham(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) 
	{
		if ((x1 == x2) && (y1 == y2)) 
			pDC->SetPixel(x1, y1, color);
		else
		{
			if (abs(x2 - x1) >= abs(y2 - y1)) 
			{ 
				if (x1 <= x2)
					_LineBresenham1(pDC, x1, y1, x2, y2, color);
				else
					_LineBresenham1(pDC, x2, y2, x1, y1, color);
			}
			else 
			{ 
				if (y1 <= y2)
					_LineBresenham2(pDC, x1, y1, x2, y2, color);
				else
					_LineBresenham2(pDC, x2, y2, x1, y1, color);
			}
		}
	}
	virtual void _LineBresenham1(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) 
	{
		int Dx = x2 - x1;
		int Dy = y2 - y1;
		int yStep = (Dy >= 0) ? 1 : -1;

		Dx = abs(Dx);
		Dy = abs(Dy);

		int Const1 = Dy << 1;
		int Const2 = (Dy - Dx) << 1;
		int p = Const1 - Dx;

		int x = x1;
		int y = y1;
		pDC->SetPixel(x, y, color);

		for (int i = 0; i < Dx; ++i) 
		{
			if (p < 0)
				p += Const1;
			else 
			{
				p += Const2;
				y += yStep;
			}
			x++;
			pDC->SetPixel(x, y, color);
		}
	}

	virtual void _LineBresenham2(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) 
	{
		int Dx = x2 - x1;
		int Dy = y2 - y1;
		int xStep = (Dx >= 0) ? 1 : -1;

		Dx = abs(Dx);
		Dy = abs(Dy);

		int Const1 = Dx << 1;
		int Const2 = (Dx - Dy) << 1;
		int p = Const1 - Dy;

		int x = x1;
		int y = y1;
		pDC->SetPixel(x, y, color);

		for (int i = 0; i < Dy; ++i) 
		{
			if (p < 0)
				p += Const1;
			else 
			{
				p += Const2;
				x += xStep;
			}
			y++;
			pDC->SetPixel(x, y, color);
		}
	}
	virtual void CircleMidPoint(CDC* pDC, int xc, int yc, int r, COLORREF color) {
		int x = 0, y = r;
		int f = 1 - r;

		SetPixel(pDC->m_hDC, xc + x, yc + y, color);
		SetPixel(pDC->m_hDC, xc - x, yc + y, color);
		SetPixel(pDC->m_hDC, xc + x, yc - y, color);
		SetPixel(pDC->m_hDC, xc - x, yc - y, color);
		SetPixel(pDC->m_hDC, xc + y, yc + x, color);
		SetPixel(pDC->m_hDC, xc - y, yc + x, color);
		SetPixel(pDC->m_hDC, xc + y, yc - x, color);
		SetPixel(pDC->m_hDC, xc - y, yc - x, color);

		while (x < y) {

			if (f < 0)
				f += (x << 1) + 3;
			else {
				y--;
				f += ((x - y) << 1) + 5;
			}
			x++;

			SetPixel(pDC->m_hDC, xc + x, yc + y, color);
			SetPixel(pDC->m_hDC, xc - x, yc + y, color);
			SetPixel(pDC->m_hDC, xc + x, yc - y, color);
			SetPixel(pDC->m_hDC, xc - x, yc - y, color);
			SetPixel(pDC->m_hDC, xc + y, yc + x, color);
			SetPixel(pDC->m_hDC, xc - y, yc + x, color);
			SetPixel(pDC->m_hDC, xc + y, yc - x, color);
			SetPixel(pDC->m_hDC, xc - y, yc - x, color);
		}
	}

// Overrides
public:
	virtual BOOL InitInstance();
	virtual int ExitInstance();

// Implementation
	afx_msg void OnAppAbout();
	DECLARE_MESSAGE_MAP()
};

extern CLineApp theApp;
