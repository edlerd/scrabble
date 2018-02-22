 / * *  
  
   C o p y r i g h t   2 0 1 4 - 2 0 1 8   D a v i d   E d l e r  
  
   L i c e n s e d   u n d e r   t h e   A p a c h e   L i c e n s e ,   V e r s i o n   2 . 0   ( t h e   " L i c e n s e " ) ;  
   y o u   m a y   n o t   u s e   t h i s   f i l e   e x c e p t   i n   c o m p l i a n c e   w i t h   t h e   L i c e n s e .  
   Y o u   m a y   o b t a i n   a   c o p y   o f   t h e   L i c e n s e   a t  
  
   h t t p : / / w w w . a p a c h e . o r g / l i c e n s e s / L I C E N S E - 2 . 0  
  
   U n l e s s   r e q u i r e d   b y   a p p l i c a b l e   l a w   o r   a g r e e d   t o   i n   w r i t i n g ,   s o f t w a r e  
   d i s t r i b u t e d   u n d e r   t h e   L i c e n s e   i s   d i s t r i b u t e d   o n   a n   " A S   I S "   B A S I S ,  
   W I T H O U T   W A R R A N T I E S   O R   C O N D I T I O N S   O F   A N Y   K I N D ,   e i t h e r   e x p r e s s   o r   i m p l i e d .  
   S e e   t h e   L i c e n s e   f o r   t h e   s p e c i f i c   l a n g u a g e   g o v e r n i n g   p e r m i s s i o n s   a n d  
   l i m i t a t i o n s   u n d e r   t h e   L i c e n s e .  
  
   * * /  
 v a r   B O A R D   =   n u l l ;   / /   f u t u r e   p o i n t e r   t o   d o m   e l e m e n t  
 v a r   B O A R D _ L E T T E R S   =   [ ] ;  
 v a r   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S   =   [ ] ;  
  
 v a r   L E T T E R _ S T A S H ;  
 v a r   P O I N T S _ P E R _ L E T T E R ;  
 v a r   L A N G U A G E _ C O N F I G ;  
 c o n s t   L A N G _ E N G L I S H   =   ' e n g l i s h ' ;  
 c o n s t   L A N G _ G E R M A N   =   ' d e u t s c h ' ;  
 c o n s t   E N G L I S H _ C O N F I G _ U R L   =   ' h t t p s : / / 7 7 1 7 7 . d e / s c r a b b l e / c o n f i g E n g l i s h . j s o n p ' ;  
 c o n s t   G E R M A N _ C O N F I G _ U R L   =   ' h t t p s : / / 7 7 1 7 7 . d e / s c r a b b l e / c o n f i g D e u t s c h . j s o n p ' ;  
 l o a d L a n g u a g e C o n f i g ( ) ;  
  
 f u n c t i o n   g e t U r l P a r a m e t e r B y N a m e ( n a m e ,   u r l )   {  
         i f   ( ! u r l )   u r l   =   w i n d o w . l o c a t i o n . h r e f ;  
         n a m e   =   n a m e . r e p l a c e ( / [ \ [ \ ] ] / g ,   " \ \ $ & " ) ;  
         v a r   r e g e x   =   n e w   R e g E x p ( " [ ? & ] "   +   n a m e   +   " ( = ( [ ^ & # ] * ) | & | # | $ ) " ) ,  
                 r e s u l t s   =   r e g e x . e x e c ( u r l ) ;  
         i f   ( ! r e s u l t s )   r e t u r n   n u l l ;  
         i f   ( ! r e s u l t s [ 2 ] )   r e t u r n   ' ' ;  
         r e t u r n   d e c o d e U R I C o m p o n e n t ( r e s u l t s [ 2 ] . r e p l a c e ( / \ + / g ,   "   " ) ) ;  
 }  
  
 f u n c t i o n   g e t C o n f i g U r l ( )   {  
         v a r   l a n g   =   g e t U r l P a r a m e t e r B y N a m e ( ' l a n g ' ) ;  
  
         s w i t c h   ( l a n g )   {  
                 c a s e   L A N G _ E N G L I S H :  
                         r e t u r n   E N G L I S H _ C O N F I G _ U R L ;  
                 c a s e   L A N G _ G E R M A N :  
                 d e f a u l t :  
                         r e t u r n   G E R M A N _ C O N F I G _ U R L ;  
         }  
 }  
  
 f u n c t i o n   i 1 8 n ( t e x t )   {  
         v a r   l a n g   =   g e t U r l P a r a m e t e r B y N a m e ( ' l a n g ' ) ;  
  
         v a r   t r a n s l a t i o n M a p   =   {  
                 " a l l e s   z u r � c k   a u f   d i e   H a n d " :   {  
                         " e n g l i s h " :   " U n s e t   s e l e c t e d   l e t t e r s "  
                 } ,  
                 " B u c h s t a b e n   t a u s c h e n   ( p a s s e n ) " :   {  
                         " e n g l i s h " :   " s w a p   l e t t e r s   ( s k i p s   t h i s   t u r n ) "  
                 } ,  
                 " � b r i g e   B u c h s t a b e n " :   {  
                         " e n g l i s h " :   " L e t t e r s   l e f t   i n   s t a s h "  
                 } ,  
                 " D e i n e   B u c h s t a b e n " :   {  
                         " e n g l i s h " :   " Y o u r   l e t t e r s "  
                 } ,  
                 " s p i e l e n " :   {  
                         " e n g l i s h " :   " s e t   l e t t e r s "  
                 } ,  
                 " D r e i f a c h e r   B u c h s t a b e n w e r t " :   {  
                         " e n g l i s h " :   " t r i p l e   l e t t e r   v a l u e "  
                 } ,  
                 " D o p p e l t e r   B u c h t s t a b e n w e r t " :   {  
                         " e n g l i s h " :   " d o u b l e   l e t t e r   v a l u e "  
                 } ,  
                 " D r e i f a c h e r   W o r t w e r t " :   {  
                         " e n g l i s h " :   " t r i p l e   w o r d   v a l u e "  
                 } ,  
                 " D o p p e l t e r   W o r t w e r t " :   {  
                         " e n g l i s h " :   " d o u b l e   w o r d   v a l u e "  
                 } ,  
                 " W e l c h e n   B u c h s t a b e n   m � c h t e s t   d u   h i e r   s e t z e n ? " :   {  
                         " e n g l i s h " :   " W h i c h   l e t t e r   d o   y o u   w a n t   t o   s e t ? "  
                 } ,  
                 " D U " :   {  
                         " e n g l i s h " :   " Y O U "  
                 } ,  
                 " K I " :   {  
                         " e n g l i s h " :   " A I "  
                 } ,  
                 " W � h l e   d i e   B u c h s t a b e n   a u s ,   w e l c h e   D u   t a u s c h e n   m � c h t e s t ,   d a n n   k l i c k e   h i e r " :   {  
                         " e n g l i s h " :   " C h o o s e   t h e   l e t t e r s   y o u   w a n t   t o   s w a p ,   t h e n   c l i c k   h e r e "  
                 }  
         } ;  
  
         i f   ( t r a n s l a t i o n M a p [ t e x t ]   & &   t r a n s l a t i o n M a p [ t e x t ] [ l a n g ] )   {  
                 r e t u r n   t r a n s l a t i o n M a p [ t e x t ] [ l a n g ] ;  
         }  
  
         r e t u r n   t e x t ;  
 }  
  
 f u n c t i o n   l o a d L a n g u a g e C o n f i g ( )   {  
         v a r   r e q u e s t   =   n e w   X M L H t t p R e q u e s t ( ) ;  
         v a r   c o n f i g U r l   =   g e t C o n f i g U r l ( ) ;  
         r e q u e s t . o p e n ( " G E T " ,   c o n f i g U r l ,   t r u e ) ;  
         r e q u e s t . o n r e a d y s t a t e c h a n g e   =   f u n c t i o n ( )  
         {  
                 i f   ( r e q u e s t . r e a d y S t a t e   = = =   4 )   {  
                         L A N G U A G E _ C O N F I G   =   J S O N . p a r s e ( r e q u e s t . r e s p o n s e T e x t ) ;  
                         L E T T E R _ S T A S H   =   L A N G U A G E _ C O N F I G . L E T T E R _ S T A S H ;  
                         P O I N T S _ P E R _ L E T T E R   =   L A N G U A G E _ C O N F I G . P O I N T S _ P E R _ L E T T E R ;  
                         l o a d D i c t i o n a r y ( ) ;  
                 }  
         } ;  
         r e q u e s t . s e n d ( n u l l ) ;  
 }  
  
 v a r   P L A Y E R _ 1 _ L E T T E R S   =   [ ] ;  
 v a r   P L A Y E R _ 1 _ P O I N T S     =   0 ;  
  
 v a r   P L A Y E R _ 2 _ L E T T E R S   =   [ ] ;  
 v a r   P L A Y E R _ 2 _ P O I N T S     =   0 ;  
  
 v a r   K I _ I N T E L L I G E N C E   =   1 ;   / /   f r o m   0   t o   1  
  
 v a r   M A X _ P O I N T S   =   0 ;  
 v a r   M A X _ R E S U L T   =   { } ;  
  
 v a r   B O T H _ P L A Y E R S _ P A S S _ C O U N T   =   0 ;  
  
 v a r   D I C T I O N A R Y   =   [ ] ;  
  
 f u n c t i o n   l o a d D i c t i o n a r y ( )   {  
         v a r   r e q u e s t   =   n e w   X M L H t t p R e q u e s t ( ) ;  
         r e q u e s t . o p e n ( " G E T " ,   L A N G U A G E _ C O N F I G . D I C T I O N A R Y _ U R L ,   t r u e ) ;  
         r e q u e s t . o n r e a d y s t a t e c h a n g e   =   f u n c t i o n ( )  
         {  
                 i f   ( r e q u e s t . r e a d y S t a t e   = = =   4 )   {  
                         D I C T I O N A R Y   =   r e q u e s t . r e s p o n s e T e x t . r e p l a c e ( " O E " , " � " ) . r e p l a c e ( " U E " , ' � ' ) . r e p l a c e ( ' A E ' , ' � ' ) . t o U p p e r C a s e ( ) ;  
                         s t a r t G a m e ( ) ;  
                 }  
         } ;  
         r e q u e s t . s e n d ( n u l l ) ;  
 }  
  
 f u n c t i o n   s h o w L e t t e r I n p u t ( e l e m )   {  
         / /   g e t   c u r r e n t   f i e l d  
         v a r   t a r g e t P o s i t i o n   =   e l e m . s r c E l e m e n t . i d . s u b s t r i n g ( 1 , e l e m . s r c E l e m e n t . i d . l e n g t h ) . s p l i t ( " _ " ) ;  
         v a r   x   =   p a r s e I n t ( t a r g e t P o s i t i o n [ 0 ] )   -   1 ;  
         v a r   y   =   p a r s e I n t ( t a r g e t P o s i t i o n [ 1 ] )   -   1 ;  
  
         / /   i f   t h e r e   i s   a l r e a d y   a   a c t i v e   t i l e ,   r e m o v e   i t .  
         i f   ( e l e m . t a r g e t . b g C o l o r   = = =   " Y e l l o w " )   {  
                 v a r   r e t u r n e d I n d e x   =   x   *   1 5   +   y ;  
                 v a r   l e t t e r   =   B O A R D _ L E T T E R S [ r e t u r n e d I n d e x ] ;  
                 B O A R D _ L E T T E R S [ x * 1 5 + y ]   =   " " ;  
                 T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . s p l i c e ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( r e t u r n e d I n d e x ) ,   1 ) ;  
                 P L A Y E R _ 1 _ L E T T E R S . p u s h ( l e t t e r ) ;  
                 e l e m . t a r g e t . b g C o l o r   =   " W h i t e " ;  
                 p r i n t P l a y e r s L e t t e r s ( ) ;  
                 p r i n t B o a r d ( ) ;  
                 u p d a t e P l a y B u t t o n ( ) ;  
                 r e t u r n ;  
         }  
  
         / /   t h e r e   i s   a l r e a d y   a   l e t t e r  
         i f   ( e l e m . t a r g e t . i n n e r H T M L   ! = =   ' ' )   {  
                 r e t u r n ;  
         }  
  
         / /   m a r k   t a r g e t   c e l l  
         e l e m . s r c E l e m e n t . b g C o l o r = " o r a n g e " ;  
         e l e m . s r c E l e m e n t . c l a s s L i s t . a d d ( " i n p u t _ h e r e " ) ;  
  
         / /   s h o w   t h e   i n p u t   l a y e r  
         v a r   i n p u t _ c o n t a i n e r   =   d o c u m e n t . g e t E l e m e n t B y I d ( " i n p u t _ c o n t a i n e r " ) ;  
         i n p u t _ c o n t a i n e r . s t y l e . p a d d i n g =   ( e l e m . s r c E l e m e n t . o f f s e t T o p   +   1 0 )   +   "   0   0   "   +   ( e l e m . s r c E l e m e n t . o f f s e t L e f t   +   5 5 ) ;  
         i n p u t _ c o n t a i n e r . s t y l e . d i s p l a y =   " b l o c k " ;  
         i n p u t _ c o n t a i n e r . i n n e r H T M L   =   i 1 8 n ( ' W e l c h e n   B u c h s t a b e n   m � c h t e s t   d u   h i e r   s e t z e n ? ' )   +   " < b r > < d i v   c l a s s = ' i n p u t _ l e t t e r ' > "   +   P L A Y E R _ 1 _ L E T T E R S . j o i n ( " < / d i v > < d i v   c l a s s = ' i n p u t _ l e t t e r ' > " )   +   " < / d i v > " ;  
  
         / /   a p p e n d   e v e n t   l i s t e n e r s   t o   i n p u t   b u t t o n s  
         v a r   b u t t o n s = d o c u m e n t . g e t E l e m e n t s B y C l a s s N a m e ( " i n p u t _ l e t t e r " ) ;  
         f o r   ( v a r   i = 0 ;   i < b u t t o n s . l e n g t h ;   i + + )   {  
                 b u t t o n s [ i ] . o n c l i c k   =   l e t t e r C l i c k e d ;  
         }  
 }  
  
 f u n c t i o n   l e t t e r C l i c k e d ( e l e m )   {  
         / /   h i d e   i n p u t   l a y e r  
         d o c u m e n t . g e t E l e m e n t B y I d ( " i n p u t _ c o n t a i n e r " ) . s t y l e . d i s p l a y = " n o n e " ;  
  
         / /   g e t   t a r g e t   f i e l d  
         v a r   t a r g e t R e c t   =   d o c u m e n t . g e t E l e m e n t s B y C l a s s N a m e ( " i n p u t _ h e r e " ) [ 0 ] ;  
         t a r g e t R e c t . c l a s s L i s t . r e m o v e ( " i n p u t _ h e r e " ) ;  
  
         / /   g e t   c l i c k e d   l e t t e r  
         v a r   l e t t e r   =   e l e m . s r c E l e m e n t . i n n e r H T M L ;  
  
         / /   g e t   t a r g e t   p o s i t i o n  
         v a r   t a r g e t P o s i t i o n   =   t a r g e t R e c t . i d . s u b s t r i n g ( 1 , t a r g e t R e c t . i d . l e n g t h ) . s p l i t ( " _ " ) ;  
         v a r   x   =   p a r s e I n t ( t a r g e t P o s i t i o n [ 0 ] )   -   1 ;  
         v a r   y   =   p a r s e I n t ( t a r g e t P o s i t i o n [ 1 ] )   -   1 ;  
  
         v a r   l e t t e r _ p o s i t i o n   =   P L A Y E R _ 1 _ L E T T E R S . i n d e x O f ( l e t t e r ) ;  
         i f   ( l e t t e r _ p o s i t i o n   = = =   - 1 )   {  
                 a l e r t ( " D e n   B u c h s t a b e n   h a s t   d u   n i c h t   a u f   d e r   H a n d ! " ) ;  
                 r e t u r n ;  
         }  
  
         / /   s e t   t h e   l e t t e r  
         B O A R D _ L E T T E R S [ x * 1 5   +   y ]   =   l e t t e r ;  
         P L A Y E R _ 1 _ L E T T E R S . s p l i c e ( l e t t e r _ p o s i t i o n , 1 ) ;  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . p u s h ( x * 1 5   +   y ) ;  
         p r i n t P l a y e r s L e t t e r s ( ) ;  
         p r i n t B o a r d ( ) ;  
         u p d a t e P l a y B u t t o n ( ) ;  
 }  
  
 f u n c t i o n   u p d a t e P l a y B u t t o n ( )   {  
         v a r   p o i n t s   =   c h e c k V a l i d S t a t e A n d C a l c u l a t e P o i n t s ( ) ;  
         i f   ( p o i n t s )   {  
                 d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . i n n e r H T M L   =   i 1 8 n ( " s p i e l e n " )   +   "   ( "   +   p o i n t s   +   " ) " ;  
                 d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . d i s a b l e d   =   f a l s e ;  
         }   e l s e   {  
                 d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . i n n e r H T M L   =   i 1 8 n ( " s p i e l e n " ) ;  
                 d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . d i s a b l e d   =   t r u e ;  
         }  
 }  
  
 f u n c t i o n   d r a w T i l e s ( p l a y e r _ v a r )   {  
         w h i l e   ( p l a y e r _ v a r . l e n g t h   <   7   & &   L E T T E R _ S T A S H . l e n g t h   >   0 )   {  
                 v a r   i   =   M a t h . f l o o r ( M a t h . r a n d o m ( )   *   L E T T E R _ S T A S H . l e n g t h ) ;  
                 p l a y e r _ v a r . p u s h ( L E T T E R _ S T A S H [ i ] ) ;  
                 L E T T E R _ S T A S H . s p l i c e ( i , 1 ) ;  
         }  
 }  
  
 f u n c t i o n   p r i n t P l a y e r s L e t t e r s ( )   {  
         v a r   o u t   =   " " ;  
         f o r   ( v a r   i = 0 ;   i < P L A Y E R _ 1 _ L E T T E R S . l e n g t h ;   i + + )   {  
                 o u t   + =   ' < d i v   c l a s s = " h a n d _ l e t t e r " > '   +   P L A Y E R _ 1 _ L E T T E R S [ i ]   +   ' < d i v   c l a s s = " h a n d _ l e t t e r _ p o i n t s " > '   +   P O I N T S _ P E R _ L E T T E R [ P L A Y E R _ 1 _ L E T T E R S [ i ] ]   +   ' < / d i v > < / d i v > ' ;  
         }  
         d o c u m e n t . g e t E l e m e n t B y I d ( " p l a y e r _ 1 _ l e t t e r s " ) . i n n e r H T M L   =   o u t ;  
 }  
  
 f u n c t i o n   p r i n t B o a r d ( )   {  
         f o r   ( v a r   i = 0 ;   i < 1 5 ;   i + + )   {  
                 f o r   ( v a r   j = 0 ;   j < 1 5 ;   j + + )   {  
                         B O A R D . r o w s [ i ] . c e l l s [ j ] . i n n e r H T M L = B O A R D _ L E T T E R S [ i   *   1 5   +   j ] ;  
  
                         i f   ( B O A R D _ L E T T E R S [ i   *   1 5   +   j ]   = = =   ' ' )   {  
                                 B O A R D . r o w s [ i ] . c e l l s [ j ] . s t y l e . c u r s o r   =   " p o i n t e r " ;  
                         }   e l s e   {  
                                 B O A R D . r o w s [ i ] . c e l l s [ j ] . s t y l e . c u r s o r   =   " a u t o " ;  
                         }  
  
                         i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( i   *   1 5   +   j )   ! = =   - 1 )   {  
                                 B O A R D . r o w s [ i ] . c e l l s [ j ] . b g C o l o r   =   " Y e l l o w " ;  
  
                                 B O A R D . r o w s [ i ] . c e l l s [ j ] . s t y l e . c u r s o r   =   " n o - d r o p " ;  
                         }   e l s e   {  
                                 B O A R D . r o w s [ i ] . c e l l s [ j ] . b g C o l o r   =   " W h i t e " ;  
                         }  
                 }  
         }  
  
         / /   s c o r e  
         d o c u m e n t . g e t E l e m e n t B y I d ( " p l a y e r _ 1 _ p o i n t s " ) . i n n e r H T M L   =   P L A Y E R _ 1 _ P O I N T S . t o S t r i n g ( ) ;  
         d o c u m e n t . g e t E l e m e n t B y I d ( " p l a y e r _ 2 _ p o i n t s " ) . i n n e r H T M L   =   P L A Y E R _ 2 _ P O I N T S . t o S t r i n g ( ) ;  
  
         / /   r e m a i n i n g   t i l e s  
         d o c u m e n t . g e t E l e m e n t B y I d ( " l e t t e r s _ l e f t " ) . i n n e r H T M L   =   L E T T E R _ S T A S H . l e n g t h . t o S t r i n g ( ) ;  
 }  
  
 f u n c t i o n   t a k e B a c k C u r r e n t T i l e s ( )   {  
         f o r   ( v a r   i = 0 ;   i < T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h ;   i + + )   {  
                 v a r   p o s   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] ;  
                 P L A Y E R _ 1 _ L E T T E R S . p u s h ( B O A R D _ L E T T E R S [ p o s ] ) ;  
                 B O A R D _ L E T T E R S [ p o s ]   =   ' ' ;  
         }  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h = 0 ;  
         p r i n t P l a y e r s L e t t e r s ( ) ;  
         p r i n t B o a r d ( ) ;  
         u p d a t e P l a y B u t t o n ( ) ;  
 }  
  
 f u n c t i o n   i s W o r d I n D i c t i o n a r y ( w o r d )   {  
         i f   ( M a t h . r a n d o m ( )   >   K I _ I N T E L L I G E N C E )   {  
                 r e t u r n   f a l s e ;  
         }  
  
         r e t u r n   D I C T I O N A R Y . m a t c h ( " \ n "   +   w o r d   +   " \ n " )   ! = =   n u l l ;  
 }  
  
 f u n c t i o n   i s W o r d S t a r t I n D i c t i o n a r y ( w o r d )   {  
         r e t u r n   D I C T I O N A R Y . m a t c h ( " \ n "   +   w o r d )   ! = =   n u l l ;  
 }  
  
 f u n c t i o n   f i n d W o r d s A n d P o i n t s B y A c t i v e L e t t e r s ( )   {  
         v a r   w o r d s   =   [ ] ;  
         v a r   p o i n t S u m   =   0 ;  
         f o r   ( v a r   i = 0 ;   i   <   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h ;   i + + )   {  
                 v a r   c u r   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] ;  
                 / *  
                   *   h o r i z o n t a l   w o r d s  
                   * /  
                 / /   f i n d   l e f t e s t   l e t t e r  
                 v a r   h = c u r ;  
                 w h i l e   ( B O A R D _ L E T T E R S [ h - 1 ]   ! = =   " "   & &   ( h   %   1 5 )   >   0 )   {  
                         h   - = 1 ;  
                 }  
                 / / c o n s t r u c t   w o r d  
                 v a r   w o r d _ m u l t i p l i e r   =   1 ;  
                 v a r   l e t t e r _ m u l t i p l i e r   =   1 ;  
                 v a r   w o r d   =   B O A R D _ L E T T E R S [ h ] ;  
                 i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( h )   ! = =   - 1 )   {  
                         i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d l " ) )   {  
                                 l e t t e r _ m u l t i p l i e r   =   2 ;  
                         }  
                         i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t l " ) )   {  
                                 l e t t e r _ m u l t i p l i e r   =   3 ;  
                         }  
                         i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d w " ) )   {  
                                 w o r d _ m u l t i p l i e r   * =   2 ;  
                         }  
                         i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t w " ) )   {  
                                 w o r d _ m u l t i p l i e r   * =   3 ;  
                         }  
                 }  
                 v a r   p o i n t s   =   l e t t e r _ m u l t i p l i e r   *   P O I N T S _ P E R _ L E T T E R [ B O A R D _ L E T T E R S [ h ] ] ;  
                 h + + ;  
                 w h i l e   ( B O A R D _ L E T T E R S [ h ]   ! = =   " "   & &   ( h   %   1 5 )   ! = =   0 )   {  
                         l e t t e r _ m u l t i p l i e r   =   1 ;  
                         i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( h )   ! = =   - 1 )   {  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d l " ) )   {  
                                         l e t t e r _ m u l t i p l i e r   =   2 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t l " ) )   {  
                                         l e t t e r _ m u l t i p l i e r   =   3 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d w " ) )   {  
                                         w o r d _ m u l t i p l i e r   * =   2 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( h / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( h % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t w " ) )   {  
                                         w o r d _ m u l t i p l i e r   * =   3 ;  
                                 }  
                         }  
                         w o r d   =   w o r d . c o n c a t ( B O A R D _ L E T T E R S [ h ] ) ;  
                         p o i n t s   + =   l e t t e r _ m u l t i p l i e r   *   P O I N T S _ P E R _ L E T T E R [ B O A R D _ L E T T E R S [ h ] ] ;  
                         h + = 1 ;  
                 }  
                 i f   ( w o r d . l e n g t h   >   1   & &   w o r d s . i n d e x O f ( w o r d )   = = =   - 1 )   {  
                         w o r d s . p u s h ( w o r d ) ;  
                         p o i n t S u m   + =   p o i n t s   *   w o r d _ m u l t i p l i e r ;  
                 }  
  
                 / *  
                   *   v e r t i c a l   w o r d s  
                   * /  
                 / /   f i n d   h i g h e s t   l e t t e r  
                 v a r   v = c u r ;  
                 w h i l e   ( B O A R D _ L E T T E R S [ v - 1 5 ]   ! = =   " "   & &   v   >   1 4 )   {  
                         v   - =   1 5 ;  
                 }  
                 / / c o n s t r u c t   w o r d  
                 w o r d   =   ' ' ;  
                 p o i n t s   =   0 ;  
                 w o r d _ m u l t i p l i e r   =   1 ;  
                 w h i l e   ( B O A R D _ L E T T E R S [ v ]   ! = =   " "   & &   v   <   2 2 5 )   {  
                         l e t t e r _ m u l t i p l i e r   =   1 ;  
                         i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( v )   ! = =   - 1 )   {  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( v / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( v % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d l " ) )   {  
                                         l e t t e r _ m u l t i p l i e r   =   2 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( v / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( v % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t l " ) )   {  
                                         l e t t e r _ m u l t i p l i e r   =   3 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( v / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( v % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " d w " ) )   {  
                                         w o r d _ m u l t i p l i e r   * =   2 ;  
                                 }  
                                 i f   ( d o c u m e n t . g e t E l e m e n t B y I d ( " s " +   M a t h . f l o o r ( v / 1 5 + 1 )   +   " _ "   +   M a t h . f l o o r ( v % 1 5 + 1 ) ) . c l a s s L i s t . c o n t a i n s ( " t w " ) )   {  
                                         w o r d _ m u l t i p l i e r   * =   3 ;  
                                 }  
                         }  
                         w o r d   =   w o r d . c o n c a t ( B O A R D _ L E T T E R S [ v ] ) ;  
                         p o i n t s   + =   l e t t e r _ m u l t i p l i e r   *   P O I N T S _ P E R _ L E T T E R [ B O A R D _ L E T T E R S [ v ] ] ;  
                         v   + =   1 5 ;  
                 }  
                 i f   ( w o r d . l e n g t h   >   1   & &   w o r d s . i n d e x O f ( w o r d )   = = =   - 1 )   {  
                         w o r d s . p u s h ( w o r d ) ;  
                         p o i n t S u m   + =   p o i n t s   *   w o r d _ m u l t i p l i e r ;  
                 }  
         }  
         r e t u r n   [ w o r d s ,   p o i n t S u m ] ;  
 }  
  
 / * *  
   *   i s   t h e   c u r r e n t   p o s i t i o n   o f   n e w   l e t t e r s   v a l i d ?  
   *  
   *   o n e   n e w   w o r d   s e t   a n d   n o   l e t t e r s   o n   r a n d o m   p o i n t s   o f   t h e   b o a r d  
   *   n e w   w o r d   i s   c o n n e c t e d   t o   o l d   l e t t e r s  
   *   o r   o p e n i n g   o f   t h e   g a m e   a n d   c e n t e r   f i e l d   u s e d  
   * * /  
 f u n c t i o n   i s L e t t e r P o s i t i o n V a l i d ( )   {  
         v a r   s t a r t   =   2 2 5 ;  
         v a r   e n d   =   0 ;  
         f o r   ( i = 0 ;   i   <   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h ;   i + + )   {  
                 i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ]   <   s t a r t )   {  
                         s t a r t   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] ;  
                 }  
                 i f   ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ]   >   e n d )   {  
                         e n d   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] ;  
                 }  
         }  
  
         v a r   l i n e E n d   =   M a t h . a b s ( 1 4   -   ( s t a r t   %   1 5 ) )   +   s t a r t ;  
         v a r   i s H o r i z o n t a l   =   l i n e E n d   > =   e n d ;  
         v a r   i n c r e m e n t   =   i s H o r i z o n t a l   ?   1   :   1 5 ;  
  
         f o r   ( i = s t a r t ;   i < e n d ;   i + = i n c r e m e n t )   {  
                 i f   ( B O A R D _ L E T T E R S [ i ]   = = =   " " )   {  
                         r e t u r n   f a l s e ;  
                 }  
         }  
  
         / /   d o   t h e   t i l e s   c o n n e c t   t o   l e t t e r s   o n   t h e   b o a r d ?  
         f o r   ( v a r   i = 0 ;   i   <   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h ;   i + + )   {  
                 v a r   l e f t   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] - 1 ;  
                 i f   ( l e f t % 1 5   <   1 4   & &   i s F i e l d W i t h L e t t e r ( l e f t ) )   {  
                         r e t u r n   t r u e ;  
                 }  
  
                 v a r   r i g h t   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] + 1 ;  
                 i f   ( r i g h t % 1 5   >   0   & &   i s F i e l d W i t h L e t t e r ( r i g h t ) )   {  
                         r e t u r n   t r u e ;  
                 }  
  
                 v a r   t o p   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] - 1 5 ;  
                 i f   ( t o p   >   0   & &   i s F i e l d W i t h L e t t e r ( t o p ) )   {  
                         r e t u r n   t r u e ;  
                 }  
  
                 v a r   d o w n   =   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S [ i ] + 1 5 ;  
                 i f   ( d o w n   <   2 2 5   & &   i s F i e l d W i t h L e t t e r ( d o w n ) )   {  
                         r e t u r n   t r u e ;  
                 }  
         }  
  
         r e t u r n   w a s B o a r d E m p t y ( )   & &   i s C e n t e r F i e l d U s e d ( ) ;  
 }  
  
 f u n c t i o n   w a s B o a r d E m p t y ( )   {  
         f o r   ( v a r   i   =   0 ;   i   <   2 2 5 ;   i + + )   {  
                 i f   ( B O A R D _ L E T T E R S [ i ]   ! = =   ' '   & &   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( i )   = = =   - 1 )   {  
                         r e t u r n   f a l s e ;  
                 }  
         }  
  
         r e t u r n   t r u e ;  
 }  
  
 f u n c t i o n   i s C e n t e r F i e l d U s e d ( )   {  
         r e t u r n   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( 1 1 2 )   ! = =   - 1 ;  
 }  
  
 f u n c t i o n   i s F i e l d W i t h L e t t e r ( i n d e x )   {  
         r e t u r n   T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( i n d e x )   = = =   - 1   & &   B O A R D _ L E T T E R S [ i n d e x ]   ! = =   ' ' ;  
 }  
  
 f u n c t i o n   c h e c k V a l i d S t a t e A n d C a l c u l a t e P o i n t s ( )   {  
         i f   ( ! i s L e t t e r P o s i t i o n V a l i d ( ) )   {  
                 r e t u r n   f a l s e ;  
         }  
  
         v a r   t   =   f i n d W o r d s A n d P o i n t s B y A c t i v e L e t t e r s ( ) ;  
         v a r   w o r d s   =   t [ 0 ] ;  
         v a r   p o i n t s   =   t [ 1 ] ;  
  
         i f   ( w o r d s . l e n g t h   <   1 )   {  
                 r e t u r n   f a l s e ;  
         }  
  
         f o r   ( v a r   i = 0 ;   i < w o r d s . l e n g t h ;   i + + )   {  
                 i f   ( ! i s W o r d I n D i c t i o n a r y ( w o r d s [ i ] ) )   {  
                         r e t u r n   f a l s e ;  
                 }  
         }  
  
         r e t u r n   p o i n t s ;  
 }  
  
 f u n c t i o n   o n F i n i s h M o v e C l i c k ( )   {  
         P L A Y E R _ 1 _ P O I N T S   + =   c h e c k V a l i d S t a t e A n d C a l c u l a t e P o i n t s ( ) ;  
         B O T H _ P L A Y E R S _ P A S S _ C O U N T   =   0 ;  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S   =   [ ] ;  
         d r a w T i l e s ( P L A Y E R _ 1 _ L E T T E R S ) ;  
         p r i n t P l a y e r s L e t t e r s ( ) ;  
         p r i n t B o a r d ( ) ;  
         s t a r t K i M o v e ( ) ;  
 }  
  
 f u n c t i o n   s t a r t K i M o v e ( )   {  
         u p d a t e P l a y B u t t o n ( ) ;  
  
         d o c u m e n t . g e t E l e m e n t B y I d ( " i n p u t _ c o n t a i n e r " ) . i n n e r H T M L = ' w a i t i n g   f o r   k i ' ;  
         d o c u m e n t . g e t E l e m e n t B y I d ( " i n p u t _ c o n t a i n e r " ) . s t y l e . d i s p l a y =   " b l o c k " ;  
  
         s e t T i m e o u t (  
                 f u n c t i o n ( )   {  
                         / /   k i _ i n t e l l i g e n c e :   t h e   c l o s e r   t o   1   t h e   m o r e   c l e v e r   t h e   k i  
                         K I _ I N T E L L I G E N C E   =   0 . 2 ;  
                         c o m p u t e r M o v e ( ) ;  
                         d o c u m e n t . g e t E l e m e n t B y I d ( " i n p u t _ c o n t a i n e r " ) . s t y l e . d i s p l a y =   " n o n e " ;  
                         K I _ I N T E L L I G E N C E   =   1 ;  
                 } ,  
                 1 0 0  
         ) ;  
  
         r e t u r n   t r u e ;  
 }  
  
 f u n c t i o n   o n L e t t e r T o S w a p C l i c k e d ( e l e m )   {  
         i f   ( e l e m . s r c E l e m e n t . s t y l e . b a c k g r o u n d   ! = =   ' y e l l o w ' )   {  
                 e l e m . s r c E l e m e n t . s t y l e . b a c k g r o u n d   =   ' y e l l o w ' ;  
                 e l e m . s r c E l e m e n t . c l a s s L i s t . a d d ( ' s e l e c t e d _ t o _ s w i t c h ' ) ;  
         }   e l s e   {  
                 e l e m . s r c E l e m e n t . s t y l e . b a c k g r o u n d   =   ' ' ;  
                 e l e m . s r c E l e m e n t . c l a s s L i s t . r e m o v e ( ' s e l e c t e d _ t o _ s w i t c h ' ) ;  
         }  
 }  
  
 f u n c t i o n   o n S e l e c t S w a p T i l e s C l i c k e d ( )   {  
         t a k e B a c k C u r r e n t T i l e s ( ) ;  
  
         v a r   b u t t o n s = d o c u m e n t . g e t E l e m e n t s B y C l a s s N a m e ( ' h a n d _ l e t t e r ' ) ;  
         f o r   ( v a r   i = 0 ;   i < b u t t o n s . l e n g t h ;   i + + )   {  
                 b u t t o n s [ i ] . o n c l i c k   =   o n L e t t e r T o S w a p C l i c k e d ;  
         }  
  
         v a r   b u t t o n   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' p a s s ' ) ;  
         b u t t o n . i n n e r H T M L   =   i 1 8 n ( ' W � h l e   d i e   B u c h s t a b e n   a u s ,   w e l c h e   D u   t a u s c h e n   m � c h t e s t ,   d a n n   k l i c k e   h i e r ' ) ;  
         b u t t o n . o n c l i c k   =   o n P e r f o r m S w a p T i l e s ;  
 }  
  
 f u n c t i o n   o n P e r f o r m S w a p T i l e s ( )   {  
         v a r   l e t t e r s   =   d o c u m e n t . g e t E l e m e n t s B y C l a s s N a m e ( ' s e l e c t e d _ t o _ s w i t c h ' ) ;  
         f o r   ( v a r   i   =   0 ;   i   <   l e t t e r s . l e n g t h ;   i + + )   {  
                 v a r   l e t t e r   =   l e t t e r s [ i ] . i n n e r H T M L . c h a r A t ( 0 ) ;  
                 v a r   l e t t e r _ p o s i t i o n   =   P L A Y E R _ 1 _ L E T T E R S . i n d e x O f ( l e t t e r ) ;  
                 P L A Y E R _ 1 _ L E T T E R S . s p l i c e ( l e t t e r _ p o s i t i o n , 1 ) ;  
         }  
  
         d r a w T i l e s ( P L A Y E R _ 1 _ L E T T E R S ) ;  
         p r i n t P l a y e r s L e t t e r s ( ) ;  
  
         v a r   b u t t o n   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' p a s s ' ) ;  
         b u t t o n . i n n e r H T M L   =   i 1 8 n ( ' B u c h s t a b e n   t a u s c h e n   ( p a s s e n ) ' ) ;  
         b u t t o n . o n c l i c k   =   o n S e l e c t S w a p T i l e s C l i c k e d ;  
  
         i n c r e m e n t A n d C h e c k P a s s C o u n t ( ) ;  
  
         s t a r t K i M o v e ( ) ;  
 }  
  
 A r r a y . p r o t o t y p e . i n s e r t   =   f u n c t i o n   ( i n d e x ,   i t e m )   {  
         t h i s . s p l i c e ( i n d e x ,   0 ,   i t e m ) ;  
 } ;  
  
 f u n c t i o n   i n c r e m e n t A n d C h e c k P a s s C o u n t ( )   {  
         B O T H _ P L A Y E R S _ P A S S _ C O U N T   + =   1 ;  
         i f   ( B O T H _ P L A Y E R S _ P A S S _ C O U N T   > =   2 )   {  
                 d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . d i s a b l e d   =   t r u e ;  
                 d o c u m e n t . g e t E l e m e n t B y I d ( ' p a s s ' ) . d i s a b l e d   =   f a l s e ;  
                 a l e r t ( ' D a s   S p i e l   i s t   a u s . ' ) ;  
         }  
 }  
  
 / * *  
   *   p o s :   a r r a y   o f   p o s i t i o n s   i n   g a m e   a r r a y   t o   b e   f i l l e d   w i t h   a v a i l a b l e   l e t t e r s  
   *   l e t t e r s :   a r r a y   o f   a v a i l a b l e   l e t t e r s  
   *   r e s u l t :   o b j e c t   o f   i n d e x e s   i n   g a m e   a r r a y   a n d   t h e   l e t t e r s   t o   b e   s e t  
   * /  
 f u n c t i o n   t r y F r e e P o s i t i o n s ( p o s , l e t t e r s , r e s u l t )   {  
         v a r   t r y P o s   =   p o s . p o p ( ) ;  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . p u s h ( t r y P o s ) ;  
  
         / /   t r y   a l l   l e t t e r s   a v a i l a b l e   o n   c u r r e n t   p o s i t i o n  
         f o r   ( v a r   k   =   0 ;   k   <   l e t t e r s . l e n g t h ;   k + + )   {  
                 v a r   t e m p L e t t e r   =   l e t t e r s . s p l i c e ( k ,   1 ) [ 0 ] ;  
                 B O A R D _ L E T T E R S [ t r y P o s ]   =   t e m p L e t t e r ;  
                 r e s u l t [ t r y P o s ]   =   t e m p L e t t e r ;  
  
                 / /   m o r e   p o s i t i o n s   t o   f i l l ,   r e c u r s e  
                 i f   ( p o s . l e n g t h   >   0 )   {  
  
                         / /   r e c u r s e   o n l y   i f   w e   h a v e   l a i d   v a l i d   s t a r t s   o f   w o r d s   y e t  
                         v a r   r e c u r s e   =   t r u e ;  
                         v a r   w o r d s   =   f i n d W o r d s A n d P o i n t s B y A c t i v e L e t t e r s ( ) [ 0 ] ;  
  
                         f o r   ( v a r   i   =   0 ;   i   <   w o r d s . l e n g t h ;   i + + )   {  
                                 i f   ( ! i s W o r d S t a r t I n D i c t i o n a r y ( w o r d s [ i ] ) )   {  
                                         r e c u r s e   =   f a l s e ;  
                                         b r e a k ;  
                                 }  
                         }  
                         i f   ( r e c u r s e )   {  
                                 t r y F r e e P o s i t i o n s ( p o s ,   l e t t e r s ,   r e s u l t ) ;  
                         }  
                 }   e l s e   {  
                         v a r   p o i n t s   =   c h e c k V a l i d S t a t e A n d C a l c u l a t e P o i n t s ( ) ;  
  
                         / /   s t o r e   p o i n t s  
                         / /   s t o r e   p o s i t i o n   a n d   l e t t e r s   i n   r e s u l t  
                         i f   ( p o i n t s   >   M A X _ P O I N T S )   {  
                                 M A X _ P O I N T S   =   p o i n t s ;  
                                 / / c o p y   b y   v a l u e  
                                 M A X _ R E S U L T   =   J S O N . p a r s e ( J S O N . s t r i n g i f y ( r e s u l t ) ) ;  
                                 c o n s o l e . l o g ( ' f o u n d   i t ' ) ;  
                                 c o n s o l e . l o g ( p o i n t s ) ;  
                                 c o n s o l e . l o g ( r e s u l t ) ;  
                         }  
                 }  
                 B O A R D _ L E T T E R S [ t r y P o s ]   =   ' ' ;  
                 r e s u l t [ t r y P o s ]   =   ' ' ;  
                 l e t t e r s . i n s e r t ( k ,   t e m p L e t t e r ) ;  
         }  
  
         p o s . p u s h ( t r y P o s ) ;  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . s p l i c e ( T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . i n d e x O f ( t r y P o s ) ,   1 ) ;  
 }  
  
 / / f a n c y   k i   c o m e s   h e r e  
 f u n c t i o n   c o m p u t e r M o v e ( )   {  
         M A X _ P O I N T S   =   0 ;  
         M A X _ R E S U L T   =   { } ;  
  
         / /   t r y   a l l   r o w s  
         f o r   ( v a r   r o w = 0 ;   r o w < 1 5 ;   r o w + + )   {  
  
                 / /   t r y   a l l   s t a r t i n g   p o s i t i o n s   w i t h i n   a   r o w  
                 f o r   ( v a r   r o w S t a r t = 0 ;   r o w S t a r t   <   1 4 ;   r o w S t a r t + + )   {  
  
                         / /   b e g i n n i n g   f i e l d   o f   o u r   w o r d  
                         s t a r t P o s   =   r o w * 1 5   +   r o w S t a r t ;  
  
                         / /   t h e   f i e l d   l e f t   o f   o u r   c u r r e n t   w o r d   i s   n o t   e m p t y  
                         i f   ( r o w S t a r t   ! = =   0   & &   B O A R D _ L E T T E R S [ r o w S t a r t - 1 ]   ! = =   ' ' )   {  
                                 c o n t i n u e ;  
                         }  
  
                         / /   t r y   a l l   p o s s i b l e   w o r d   l e n g t h s  
                         f o r   ( v a r   w o r d L e n g t h = 2 ;   w o r d L e n g t h   <   1 5   -   r o w S t a r t ;   w o r d L e n g t h + + )   {  
  
                                 / /   e n d   f i e l d   o f   o u r   w o r d  
                                 v a r   e n d P o s   =   r o w * 1 5   +   r o w S t a r t   +   w o r d L e n g t h ;  
  
                                 / /   t h e   f i e l d   r i g h t   o f   o u r   c u r r e n t   w o r d   i s   n o t   e m p t y  
                                 i f   ( e n d P o s   ! = =   1 5   & &   B O A R D _ L E T T E R S [ e n d P o s + 1 ]   ! = =   ' ' )   {  
                                         c o n t i n u e ;  
                                 }  
  
                                 v a r   f r e e _ l e t t e r _ p o s i t i o n s = [ ] ;  
                                 v a r   f r e e _ l e t t e r _ c o u n t = 0 ;  
                                 v a r   s e t _ l e t t e r _ c o u n t = 0 ;  
                                 f o r   ( i = s t a r t P o s ;   i   <   e n d P o s ;   i + + )   {  
                                         i f   ( B O A R D _ L E T T E R S [ i ]   = = =   ' ' )   {  
                                                 f r e e _ l e t t e r _ p o s i t i o n s [ f r e e _ l e t t e r _ c o u n t ]   =   i ;  
                                                 f r e e _ l e t t e r _ c o u n t + + ;  
                                         }   e l s e   {  
                                                 s e t _ l e t t e r _ c o u n t + + ;  
                                         }  
                                 }  
  
                                 / /   n o   l e t t e r   s e t   o r  
                                 / /   n o   f r e e   s p a c e   t o   s e t   a   l e t t e r   o r  
                                 / /   t o o   m a n y   f r e e   s p a c e s   ( s h o u l d   b e   u p   t o   n u m b e r   o f   t i l e s   o n   p l a y e r   h a n d )  
                                 i f   ( s e t _ l e t t e r _ c o u n t   = = =   0   | |   f r e e _ l e t t e r _ c o u n t   = = =   0   | |   f r e e _ l e t t e r _ c o u n t   >   3 )   {  
                                         c o n t i n u e ;  
                                 }  
  
                                 b e s t _ t r y   =   t r y F r e e P o s i t i o n s ( f r e e _ l e t t e r _ p o s i t i o n s ,   P L A Y E R _ 2 _ L E T T E R S ,   { } ) ;  
                         }  
                 }  
  
                 c o n s o l e . l o g ( ' b e s t   f i t   a f t e r   r o w '   +   r o w ) ;  
                 c o n s o l e . l o g ( M A X _ P O I N T S ) ;  
                 c o n s o l e . l o g ( M A X _ R E S U L T ) ;  
         }  
  
         / /   t r y   a l l   c o l u m n s  
         v a r   b e s t _ t r y ;  
         f o r   ( v a r   c o l u m n   =   0 ;   c o l u m n   <   1 5 ;   c o l u m n + + )   {  
  
                 / /   t h e   s t a r t i n g   p o s i t i o n   i n s i d e   t h e   c o l u m n  
                 f o r   ( v a r   c o l u m n S t a r t   =   0 ;   c o l u m n S t a r t   <   1 4 ;   c o l u m n S t a r t + + )   {  
  
                         / /   b e g i n n i n g   f i e l d   o f   o u r   w o r d  
                         v a r   s t a r t P o s   =   c o l u m n   +   1 5   *   c o l u m n S t a r t ;  
  
                         / /   t h e   f i e l d   o n   t o p   o f   o u r   c u r r e n t   w o r d   i s   n o t   e m p t y  
                         i f   ( s t a r t P o s   >   1 4   & &   B O A R D _ L E T T E R S [ s t a r t P o s   -   1 5 ]   ! = =   ' ' )   {  
                                 c o n t i n u e ;  
                         }  
  
                         / /   t r y   a l l   p o s s i b l e   w o r d   l e n g t h s  
                         f o r   ( w o r d L e n g t h   =   2 ;   w o r d L e n g t h   <   1 5   -   c o l u m n S t a r t ;   w o r d L e n g t h + + )   {  
  
                                 / /   e n d   f i e l d   o f   o u r   w o r d  
                                 e n d P o s   =   s t a r t P o s   +   ( 1 5   *   w o r d L e n g t h ) ;  
  
                                 / /   t h e   f i e l d   b e l o w   o u r   c u r r e n t   w o r d   i s   n o t   e m p t y  
                                 i f   ( e n d P o s   +   1 5   <   2 2 5   & &   B O A R D _ L E T T E R S [ e n d P o s   +   1 5 ]   ! = =   ' ' )   {  
                                         c o n t i n u e ;  
                                 }  
  
                                 f r e e _ l e t t e r _ p o s i t i o n s   =   [ ] ;  
                                 f r e e _ l e t t e r _ c o u n t   =   0 ;  
                                 s e t _ l e t t e r _ c o u n t   =   0 ;  
                                 f o r   ( i   =   s t a r t P o s ;   i   <   e n d P o s ;   i   + =   1 5 )   {  
                                         i f   ( B O A R D _ L E T T E R S [ i ]   = = =   ' ' )   {  
                                                 f r e e _ l e t t e r _ p o s i t i o n s [ f r e e _ l e t t e r _ c o u n t ]   =   i ;  
                                                 f r e e _ l e t t e r _ c o u n t + + ;  
                                         }   e l s e   {  
                                                 s e t _ l e t t e r _ c o u n t + + ;  
                                         }  
                                 }  
  
                                 / /   n o   l e t t e r   s e t   o r  
                                 / /   n o   f r e e   s p a c e   t o   s e t   a   l e t t e r   o r  
                                 / /   t o o   m a n y   f r e e   s p a c e s   ( s h o u l d   b e   u p   t o   n u m b e r   o f   t i l e s   o n   p l a y e r   h a n d )  
                                 i f   ( s e t _ l e t t e r _ c o u n t   = = =   0   | |   f r e e _ l e t t e r _ c o u n t   = = =   0   | |   f r e e _ l e t t e r _ c o u n t   >   3 )   {  
                                         c o n t i n u e ;  
                                 }  
  
                                 b e s t _ t r y   =   t r y F r e e P o s i t i o n s ( f r e e _ l e t t e r _ p o s i t i o n s ,   P L A Y E R _ 2 _ L E T T E R S ,   { } ) ;  
                         }  
                 }  
  
                 c o n s o l e . l o g ( ' b e s t   f i t   a f t e r   c o l u m n   '   +   c o l u m n ) ;  
                 c o n s o l e . l o g ( M A X _ P O I N T S ) ;  
                 c o n s o l e . l o g ( M A X _ R E S U L T ) ;  
         }  
  
         P L A Y E R _ 2 _ P O I N T S   + =   M A X _ P O I N T S ;  
  
         i f   ( M A X _ P O I N T S   = = =   0 )   {  
                 i n c r e m e n t A n d C h e c k P a s s C o u n t ( ) ;  
         }   e l s e   {  
                 B O T H _ P L A Y E R S _ P A S S _ C O U N T   =   0 ;  
         }  
  
         f o r   ( v a r   i   i n   M A X _ R E S U L T )   {  
                 v a r   l e t t e r _ p o s   =   P L A Y E R _ 2 _ L E T T E R S . i n d e x O f ( M A X _ R E S U L T [ i ] ) ;  
                 P L A Y E R _ 2 _ L E T T E R S . s p l i c e ( l e t t e r _ p o s , 1 ) ;  
                 B O A R D _ L E T T E R S [ i ]   =   M A X _ R E S U L T [ i ] ;  
         }  
  
         T O _ B E _ P L A Y E D _ B O A R D _ L E T T E R _ I N D E X E S . l e n g t h = 0 ;  
  
         c o n s o l e . l o g ( P L A Y E R _ 2 _ L E T T E R S ) ;  
  
         / /   f i l l   k i   l e t t e r s   i f   n e c e s s a r y  
         d r a w T i l e s ( P L A Y E R _ 2 _ L E T T E R S ) ;  
  
         p r i n t B o a r d ( ) ;  
 }  
  
 f u n c t i o n   s t a r t G a m e ( )   {  
         B O A R D   =   d o c u m e n t . g e t E l e m e n t B y I d ( " b o a r d " ) ;  
         / /   e v e n t   h a n d l e r s   o n   b o a r d  
         f o r   ( v a r   i = 0 ;   i < 1 5 ;   i + + )   {  
                 f o r   ( v a r   j = 0 ;   j < 1 5 ;   j + + )   {  
                         B O A R D _ L E T T E R S [ i   *   1 5   +   j ] = ' ' ;  
                         B O A R D . r o w s [ i ] . c e l l s [ j ] . o n c l i c k = s h o w L e t t e r I n p u t ;  
                 }  
         }  
  
         d o c u m e n t . g e t E l e m e n t B y I d ( " m o v e " ) . d i s a b l e d   =   t r u e ;  
  
         d r a w T i l e s ( P L A Y E R _ 1 _ L E T T E R S ) ;  
         d r a w T i l e s ( P L A Y E R _ 2 _ L E T T E R S ) ;  
         p r i n t P l a y e r s L e t t e r s ( ) ;  
         p r i n t B o a r d ( ) ;  
 }  
