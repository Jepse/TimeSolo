import os

def generate_folder_structure(start_path, output_file):
    with open(output_file, 'w') as f:
        for root, dirs, files in os.walk(start_path):
            # Skip 'node_modules', '.vscode', and '.git' directories
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.vscode', '.git']]

            # Calculate the depth of the current directory and format the indentation accordingly
            level = root.replace(start_path, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f'{indent}{os.path.basename(root)}/\n')
            sub_indent = ' ' * 4 * (level + 1)
            for file in files:
                f.write(f'{sub_indent}{file}\n')

if __name__ == "__main__":
    # Get the absolute path of the parent directory of the 'tools' folder
    start_directory = os.path.abspath(os.path.join(os.getcwd(), '..'))  # Navigate one level up from 'tools'
    output_file = os.path.join(os.getcwd(), 'folder_structure.txt')  # Output file in the current 'tools' folder
    
    # Generate the folder structure
    generate_folder_structure(start_directory, output_file)

    print(f'Folder structure has been written to {output_file}')
