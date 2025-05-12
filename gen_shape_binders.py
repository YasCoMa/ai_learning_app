import os
import cv2 # opencv-python
import numpy as np

class GenBinderDataset:
    def __init__(self, fout='/var/www/html/ai_learning_app/imgs/binding_exercise/' ):
        self.root_path = fout
        self.init_point = (30,30)
        self.resolution = (400,400,3)
        self.shapes = ['square', 'circle', 'triangle', 'inverted_triangle', 'long_square']
    
    def _rotate(self, points, angle):
        ANGLE = np.deg2rad(angle)
        c_x, c_y = np.mean(points, axis=0)
        return np.array(
            [
                [
                    c_x + np.cos(ANGLE) * (px - c_x) - np.sin(ANGLE) * (py - c_x),
                    c_y + np.sin(ANGLE) * (px - c_y) + np.cos(ANGLE) * (py - c_y)
                ]
                for px, py in points
            ]
        ).astype(int)
    
    def _gen_inverted_triangle(self):
        _clas = 'triangle_inverted'
        self.init_point = (200,200)
        
        folder = os.path.join( self.root_path, _clas)
        if( not os.path.isdir(folder) ):
            os.makedirs( folder )
            
        idx = 1
        l_init = 20
        step = 20
        xc = self.init_point[0]
        yc = self.init_point[1]
        for x in range(0, 161, step):
            d = l_init + x
            img = np.full( self.resolution, 255, dtype='uint8' )
            
            p1 = (xc, yc+d) 
            p2 = (xc-d, yc-d) 
            p3 = (xc+d, yc-d) 
            cv2.line(img, p1, p2, (0, 0, 0), 3) 
            cv2.line(img, p2, p3, (0, 0, 0), 3) 
            cv2.line(img, p1, p3, (0, 0, 0), 3) 
            
            fname = os.path.join( folder, f'{_clas}_sample_{idx}.png')
            cv2.imwrite( fname, img )
            
            idx += 1
    
    def _gen_triangle(self):
        _clas = 'triangle'
        self.init_point = (200,200)
        
        folder = os.path.join( self.root_path, _clas)
        if( not os.path.isdir(folder) ):
            os.makedirs( folder )
            
        idx = 1
        l_init = 20
        step = 20
        xc = self.init_point[0]
        yc = self.init_point[1]
        for x in range(0, 161, step):
            d = l_init + x
            img = np.full( self.resolution, 255, dtype='uint8' )
            
            p1 = (xc, yc-d) 
            p2 = (xc-d, yc+d) 
            p3 = (xc+d, yc+d) 
            cv2.line(img, p1, p2, (0, 0, 0), 3) 
            cv2.line(img, p2, p3, (0, 0, 0), 3) 
            cv2.line(img, p1, p3, (0, 0, 0), 3) 
            
            fname = os.path.join( folder, f'{_clas}_sample_{idx}.png')
            cv2.imwrite( fname, img )
            
            idx += 1
        
        '''
        img = np.full( (400,400), 255, dtype='uint8' )
        p1 = (40, 60) 
        p2 = (20, 100) 
        p3 = (60, 100) 
        cv2.line(img, p1, p2, (0, 0, 0), 3) 
        cv2.line(img, p2, p3, (0, 0, 0), 3) 
        cv2.line(img, p1, p3, (0, 0, 0), 3) 
        cv2.imwrite('ctets.png', img)
        '''
    
    def _gen_circle(self):
        _clas = 'circle'
        self.init_point = (200,200)
        
        folder = os.path.join( self.root_path, _clas)
        if( not os.path.isdir(folder) ):
            os.makedirs( folder )
            
        idx = 1
        d_init = 10
        step = 20
        for x in range(0, 100, step):
            d = d_init + x
            img = np.full( self.resolution, 255, dtype='uint8' )
            cv2.circle(img, self.init_point, d, (0, 0, 0), 5)
            
            fname = os.path.join( folder, f'{_clas}_sample_{idx}.png')
            cv2.imwrite( fname, img )
            
            idx += 1
    
    def _gen_square(self):
        _clas = 'square'
        self.init_point = (30,30)
        
        folder = os.path.join( self.root_path, _clas)
        if( not os.path.isdir(folder) ):
            os.makedirs( folder )
            
        idx = 1
        l_init = 80
        step = 20
        for x in range(0, 221, step):
            l = l_init + x
            img = np.full( self.resolution, 255, dtype='uint8' )
            cv2.rectangle(img, self.init_point, (l, l), (0, 0, 0), 5)
            
            fname = os.path.join( folder, f'{_clas}_sample_{idx}.png')
            cv2.imwrite( fname, img )
            
            idx += 1
    
    def _gen_long_square(self):
        _clas = 'long_square'
        self.init_point = (30,30)
        
        folder = os.path.join( self.root_path, _clas)
        if( not os.path.isdir(folder) ):
            os.makedirs( folder )
            
        idx = 1
        w_init = 80
        h_init = 20
        step = 20
        for x in range(0, 180, step):
            for y in range(0, 100, step):
                w = w_init + x
                h = h_init + y
                img = np.full( self.resolution, 255, dtype='uint8' )
                cv2.rectangle(img, self.init_point, (w, h), (0, 0, 0), 5)
                
                fname = os.path.join( folder, f'{_clas}_sample_{idx}.png')
                cv2.imwrite( fname, img )
                
                idx += 1

    def generate_samples_original(self):
        target1 = { 'pos': ['square', 'triangle', 'hard_onet1'], 'neg': ['long_square', 'circle', 'inverted_triangle', 'hard_onet2'] }
        target1 = { 'pos': ['long_square', 'inverted_triangle', 'hard_onet2'], 'neg': ['square', 'circle', 'triangle', 'hard_onet1'] }
        
        for s in self.shapes:
            print('Generating ', s)
            eval( f"self._gen_{s}()" )
            
o = GenBinderDataset()
o.generate_samples_original()

        
